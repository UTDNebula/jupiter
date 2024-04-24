'use client';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '@radix-ui/react-radio-group';
import { EventClubSearchBar } from '../SearchBar';
import { api } from '@src/trpc/react';
import { type eventParamsSchema, order } from '@src/utils/eventFilter';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@src/icons/Icons';
import { type useSyncedSearchParamsDispatch } from '@src/utils/useSyncedSearchParams';

export const basicFilters = [
  'Upcoming Events',
  'Last weeks events',
  'Last month events',
] as const;
type FilterProps = {
  filterState: eventParamsSchema;
  setParams: useSyncedSearchParamsDispatch<eventParamsSchema>;
};
const Filters = ({ filterState, setParams }: FilterProps) => {
  return (
    <div className="flex w-64 flex-col space-y-10">
      <div className="flex flex-col space-y-7.5">
        <h2 className="text-sm font-bold text-slate-500">Search for Club</h2>
        <div>
          <EventClubSearchBar
            addClub={(val) => {
              setParams({ clubs: [...filterState.clubs, val] });
            }}
          />
          <div className="space-y-2 p-1">
            {filterState.clubs.map((value) => (
              <SelectedClub
                key={value}
                clubId={value}
                removeClub={() => {
                  const temp = filterState.clubs.filter((c) => c !== value);
                  setParams({ clubs: temp });
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-7.5">
        <h2 className="text-sm font-bold text-slate-500">Arrange Events</h2>
        <RadioGroup
          className="flex flex-col space-y-2.5"
          defaultValue={filterState.order}
          name="order"
          onValueChange={(val: eventParamsSchema['order']) => {
            setParams({ order: val });
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
    </div>
  );
};
const SelectedClub = ({
  clubId,
  removeClub,
}: {
  clubId: string;
  removeClub: () => void;
}) => {
  const query = api.club.byId.useQuery({ id: clubId });
  return (
    <div className="relative flex w-full flex-row items-center justify-center rounded-lg bg-white py-2.5">
      <input type="hidden" name="clubs" value={clubId} />
      <span className="text-center text-xs font-extrabold text-slate-500">
        {query.data?.name}
      </span>
      <button
        className="absolute right-4"
        type="button"
        title="remove club"
        onClick={() => {
          removeClub();
        }}
      >
        X
      </button>
    </div>
  );
};
const EventSidebar = ({ filterState, setParams }: FilterProps) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col">
      <button
        className="flex items-center text-lg font-extrabold text-slate-500 sm:hidden"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <div className="w-8">{open ? <ExpandLess /> : <ExpandMore />}</div>
        <p>Filters</p>
      </button>
      <div
        data-open={open}
        className="hidden overflow-clip data-[open=true]:contents sm:contents"
      >
        <div className="flex">
          <Filters filterState={filterState} setParams={setParams} />
        </div>
      </div>
    </div>
  );
};
export default EventSidebar;
