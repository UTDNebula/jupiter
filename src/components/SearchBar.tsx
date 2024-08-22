'use client';
import {
  type Dispatch,
  type SetStateAction,
  useState,
  type ChangeEvent,
  useEffect,
} from 'react';
import { SearchIcon } from '../icons/Icons';
import { useRouter } from 'next/navigation';
import type {
  SelectClub as Club,
  SelectUserMetadata,
} from '@src/server/db/models';
import { api } from '@src/trpc/react';
import type { SelectEvent as Event } from '@src/server/db/models';

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
};

export const SearchBar = <T extends SearchElement>({
  placeholder,
  value,
  setSearch,
  searchResults,
  onClick,
}: SearchBarProps<T>) => {
  const [input, setInput] = useState<string>(value ?? '');
  const [focused, setFocused] = useState(false);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(input);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [input, setSearch]);

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
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 300)}
        />
        {input && focused && searchResults && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-sm shadow-lg">
            {searchResults.map((item) => (
              <button
                type="button"
                key={item.name}
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

export const ClubSearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const { data } = api.club.byName.useQuery(
    { name: search },
    { enabled: !!search },
  );
  const onClickSearchResult = (club: Club) => {
    router.push(`/directory/${club.id}`);
  };
  return (
    <SearchBar
      placeholder="Search for Clubs"
      setSearch={setSearch}
      searchResults={data || []}
      onClick={onClickSearchResult}
    />
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

  return (
    <SearchBar
      placeholder="Search for Events"
      setSearch={setSearch}
      searchResults={res}
      onClick={(event) => {
        router.push(`/event/${event.id}`);
      }}
    />
  );
};
type EventClubSearchBarProps = {
  addClub: (value: string) => void;
};
export const EventClubSearchBar = ({ addClub }: EventClubSearchBarProps) => {
  const [search, setSearch] = useState('');
  const [res, setRes] = useState<Club[]>([]);
  const clubQuery = api.club.byName.useQuery(
    { name: search },
    {
      enabled: !!search,
    },
  );
  useEffect(() => {
    if (clubQuery.data) {
      setRes(clubQuery.data);
    }
  }, [clubQuery.data]);
  return (
    <SearchBar
      placeholder="Select a club"
      setSearch={setSearch}
      value={search}
      searchResults={res}
      onClick={(club) => {
        addClub(club.id);
        setSearch('');
      }}
    />
  );
};
type UserSearchBarProps = {
  passUser: (user: { id: string; name: string }) => void;
};
type User = {
  name: string;
} & SelectUserMetadata;
export const UserSearchBar = ({ passUser }: UserSearchBarProps) => {
  const [search, setSearch] = useState('');
  const [res, setRes] = useState<User[]>([]);
  const userQuery = api.userMetadata.searchByName.useQuery(
    { name: search },
    {
      enabled: !!search,
    },
  );
  useEffect(() => {
    if (userQuery.data) {
      const newData = userQuery.data.map((val) => {
        return { name: val.firstName + ' ' + val.lastName, ...val };
      });
      setRes(newData);
    }
  }, [userQuery.data]);
  return (
    <SearchBar
      placeholder="Search for Someone"
      setSearch={setSearch}
      value={search}
      searchResults={res}
      onClick={(user) => {
        passUser({ id: user.id, name: user.name });
        setSearch('');
      }}
    />
  );
};
