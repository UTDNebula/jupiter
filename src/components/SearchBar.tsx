import React, {
  type Dispatch,
  type SetStateAction,
  useState,
  type ChangeEvent,
} from 'react';
import { SearchIcon } from './Icons';

type SearchElement = {
  id: string;
  name: string;
};
type SearchProvider<T extends SearchElement> = (
  search: string,
  setRes: Dispatch<SetStateAction<Array<T>>>,
) => void;
type SearchBarProps<T extends SearchElement> = {
  placeholder: string;
  searchProvider?: SearchProvider<T>;
  onClick?: (input: T) => void;
};

const SearchBar = <T extends SearchElement>({
  placeholder,
  searchProvider,
  onClick,
}: SearchBarProps<T>) => {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');
  const [res, setRes] = useState<T[]>([]);
  searchProvider ? searchProvider(search, setRes) : null;
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full max-w-xs px-5 py-4 md:max-w-sm lg:max-w-md">
      <div className="relative ">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
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
        {focused && res.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-sm shadow-lg">
            {res.map((item) => (
              <button
                key={item.name}
                className="block w-full bg-gray-50 px-4 pb-2 text-left text-lg hover:bg-gray-200"
                onClick={() => (onClick ? onClick(item) : null)}
              >
                <p className="text-sm font-semibold">{item.name}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchBar;
