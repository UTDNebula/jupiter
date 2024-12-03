'use client';
import {
  type Dispatch,
  type SetStateAction,
  useState,
  type ChangeEvent,
  useEffect,
  KeyboardEvent,
} from 'react';
import { SearchIcon } from '../icons/Icons';
import { useRouter } from 'next/navigation';
import type { SelectEvent as Event } from '@src/server/db/models';
import { api } from '@src/trpc/react';

type SearchElement = {
  id: string;
  name: string;
};
type SearchBarProps<T extends SearchElement> = {
  placeholder: string;
  value?: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchResults?: Array<T>;
  onClick?: (input: T) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const SearchBar = <T extends SearchElement>({
  placeholder,
  value,
  setSearch,
  searchResults,
  onClick,
  onKeyDown,
}: SearchBarProps<T>) => {
  const [input, setInput] = useState<string>(value ?? '');
  const [focused, setFocused] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const debouncedSetSearch = debounce(setSearch, 300);

  useEffect(() => {
    debouncedSetSearch(input);
  }, [input, debouncedSetSearch]);

  return (
    <div className="mr-3 w-full max-w-xs md:max-w-sm lg:max-w-md">
      <div className="relative">
        <span className="absolute inset-y-0 flex items-center pl-3">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          className="h-10 w-full rounded-full border pl-10 pr-3 focus:outline-none"
          tabIndex={0}
          onChange={handleSearch}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 300)}
        />
        {input && focused && searchResults && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-sm shadow-lg">
            {searchResults.map((item) => (
              <button
                type="button"
                key={item.id}
                className="w-full bg-gray-50 px-4 py-2 text-left font-semibold hover:bg-gray-200"
                onClick={() => (onClick ? onClick(item) : null)}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const EventSearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [res, setRes] = useState<Event[]>([]);

  const eventQuery = api.event.byName.useQuery(
    {
      name: search,
      sortByDate: true,
    },
    { enabled: !!search },
  );

  useEffect(() => {
    if (eventQuery.data) setRes(eventQuery.data);
  }, [eventQuery.data]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(search);
      setTimeout(() => {
        router.push(`/events?query=${search}`);
      }, 0);
    }
  };

  return (
    <SearchBar
      placeholder="Search for Events"
      setSearch={setSearch}
      searchResults={res}
      onClick={(event) => {
        router.push(`/event/${event.id}`);
      }}
      onKeyDown={handleKeyDown}
    />
  );
};