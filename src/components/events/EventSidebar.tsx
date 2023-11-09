import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '@radix-ui/react-radio-group';
import { EventClubSearchBar } from '../SearchBar';
import {
  Popover,
  PopoverPortal,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import DatePopover from './DatePopover';
import {
  useRouter,
  useSearchParams,
  usePathname,
  type ReadonlyURLSearchParams,
} from 'next/navigation';
import { type DateRange } from 'react-day-picker';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { api } from '@src/trpc/react';

export const filters = [
  'Upcoming Events',
  'Last weeks events',
  'Last month events',
] as const;
const order = [
  'soon',
  'later',
  'shortest duration',
  'longest duration',
] as const;
const types = ['In-Person', 'Virtual', 'Multi-Day', 'Hybrid'] as const;
export type filterState = {
  filter: (typeof filters)[number] | 'pick';
  date?: DateRange;
  clubs: Array<string>;
  order: (typeof order)[number];
  types: (typeof types)[number][];
};

function createSearchParams(filters: filterState) {
  const params = new URLSearchParams();
  params.set('filter', filters.filter);
  if (filters.filter == 'pick' && filters.date) {
    if (filters.date.from)
      params.set('date', filters.date.from.getTime().toString());
    if (filters.date.to)
      params.append('date', filters.date.to.getTime().toString());
  }
  params.set('order', filters.order);
  filters.clubs.forEach((val) => params.append('clubs', val));

  return params.toString();
}
function createFilterState(searchParams: ReadonlyURLSearchParams): filterState {
  const filter = searchParams.get('filter') as filterState['filter'] | null;
  const order = searchParams.get('order') as filterState['order'] | null;
  const clubs = (searchParams.getAll('clubs') ?? []) as
    | filterState['clubs']
    | null;
  if (filter === 'pick') {
    const dates = searchParams.getAll('date');
    return {
      filter: filter,
      date: {
        from: dates[0] ? new Date(Number.parseInt(dates[0])) : undefined,
        to: dates[1] ? new Date(Number.parseInt(dates[1])) : undefined,
      },
      order: order ?? 'soon',
      clubs: clubs ?? [],
      types: [],
    };
  } else {
    return {
      filter: filter ?? 'Upcoming Events',
      order: order ?? 'soon',
      clubs: clubs ?? [],
      types: [],
    };
  }
}

const EventSidebar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filterState, setFilterState] = useState<filterState>(
    createFilterState(searchParams) ?? {
      filter: 'Upcoming Events',
      clubs: [],
      order: 'soon',
      types: [],
    },
  );
  useEffect(() => {
    router.push(pathname + '?' + createSearchParams(filterState));
    router.refresh();
  }, [filterState, router, pathname, searchParams]);
  return (
    <div className="flex w-64 flex-col space-y-10">
      <div className="flex flex-col space-y-7.5">
        <h2 className="text-sm font-bold text-slate-500">Filters</h2>
        <RadioGroup
          className="space-y-2.5"
          value={filterState.filter}
          onValueChange={(value) => {
            setFilterState((old) => {
              return {
                filter: value as (typeof filters)[number],
                date: old.date,
                clubs: old.clubs,
                order: old.order,
                types: old.types,
              };
            });
          }}
        >
          {filters.map((value) => (
            <RadioGroupItem
              key={value}
              value={value}
              className="h-10 w-64 rounded-lg bg-white py-2.5 drop-shadow-sm"
            >
              <div className="ml-4 mr-10 flex h-min flex-row items-center space-x-2.5 text-center">
                <div className="flex h-5 w-5 items-center justify-center rounded-xl border-2 border-gray-50 p-0.5 shadow-sm ">
                  <RadioGroupIndicator className="h-2.5 w-2.5 rounded-full bg-blue-primary" />
                </div>
                <p className="w-full text-xs font-extrabold text-slate-500">
                  {value}
                </p>
              </div>
            </RadioGroupItem>
          ))}
          <RadioGroupItem
            value="pick"
            className="h-10 w-64 rounded-lg bg-white py-2.5 drop-shadow-sm"
          >
            <Popover defaultOpen={false}>
              <PopoverTrigger asChild>
                <div className="relative ml-4 mr-10 flex h-min flex-row items-center space-x-2.5 text-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-xl border-2 border-gray-50 p-0.5 shadow-sm ">
                    <RadioGroupIndicator className="h-2.5 w-2.5 rounded-full bg-blue-primary" />
                  </div>
                  <p className="w-full text-xs font-extrabold text-slate-500">
                    Pick a date range
                  </p>
                </div>
              </PopoverTrigger>
              <PopoverPortal>
                {filterState.filter === 'pick' && (
                  <DatePopover
                    range={filterState.date}
                    setRange={(val) => {
                      setFilterState((old) => {
                        return {
                          filter: 'pick',
                          clubs: old.clubs,
                          date: val,
                          order: old.order,
                          types: old.types,
                        };
                      });
                    }}
                  />
                )}
              </PopoverPortal>
            </Popover>
          </RadioGroupItem>
        </RadioGroup>
      </div>
      <div className="flex flex-col space-y-7.5">
        <h2 className="text-sm font-bold text-slate-500">Search for Club</h2>
        <EventClubSearchBar
          addClub={(val) => {
            setFilterState((old) => {
              if (!old.clubs.includes(val)) {
                return {
                  filter: old.filter,
                  clubs: [...old.clubs, val],
                  order: old.order,
                  types: old.types,
                };
              }
              return old;
            });
          }}
        />
        <div className="space-y-2 p-1">
          {filterState.clubs.map((value) => (
            <SelectedClub
              key={value}
              clubId={value}
              setFilterState={setFilterState}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-7.5">
        <h2 className="text-sm font-bold text-slate-500">Order</h2>
        <RadioGroup
          className="flex flex-col space-y-2.5"
          value={filterState.order}
          onValueChange={(value) => {
            setFilterState((old) => {
              return {
                filter: old.filter,
                clubs: old.clubs,
                order: value as (typeof order)[number],
                types: old.types,
              };
            });
          }}
        >
          {order.map((value) => (
            <RadioGroupItem
              key={value}
              value={value}
              className="h-10 w-64 rounded-lg bg-white py-2.5 drop-shadow-sm"
            >
              <div className="ml-4 mr-10 flex h-min flex-row items-center space-x-2.5 text-center">
                <div className="flex h-5 w-5 items-center justify-center rounded-xl border-2 border-gray-50 p-0.5 shadow-sm ">
                  <RadioGroupIndicator className="h-2.5 w-2.5 rounded-full bg-blue-primary" />
                </div>
                <p className="w-full text-xs font-extrabold text-slate-500">
                  {value}
                </p>
              </div>
            </RadioGroupItem>
          ))}
        </RadioGroup>
      </div>
      <div className="flex hidden flex-col space-y-7.5">
        <h2 className="text-sm font-bold text-slate-500">Event Types</h2>
        <div className="flex flex-col space-y-2.5">
          {types.map((value) => (
            <div
              key={value}
              className="h-10 w-64 rounded-lg bg-white py-2.5 drop-shadow-sm"
            >
              <label>
                <div className="ml-4 mr-10 flex flex-row items-center space-x-2.5 text-center">
                  <input type="checkbox" id={`filter-${value}`} name="filter" />
                  <p className="w-full text-xs font-extrabold text-slate-500">
                    {value}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EventSidebar;
const SelectedClub = ({
  clubId,
  setFilterState,
}: {
  clubId: string;
  setFilterState: Dispatch<SetStateAction<filterState>>;
}) => {
  const query = api.club.byId.useQuery({ id: clubId });
  return (
    <div className="relative flex w-full flex-row items-center justify-center rounded-lg bg-white py-2.5">
      <span className="text-center text-xs font-extrabold text-slate-500">
        {query.data?.name}
      </span>
      <button
        className="absolute right-4"
        type="button"
        title="remove club"
        onClick={() => {
          setFilterState((old) => {
            const clubs = old.clubs.filter((val) => val != clubId);
            return {
              filter: old.filter,
              clubs: clubs,
              order: old.order,
              types: old.types,
            };
          });
        }}
      >
        X
      </button>
    </div>
  );
};
