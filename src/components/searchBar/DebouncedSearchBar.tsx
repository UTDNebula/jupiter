'use client';
import {
  useState,
  type ChangeEvent,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { SearchBar } from '.';

export type SearchElement = {
  id: string;
  name: string;
};
export type DebouncedSearchBarProps<T extends SearchElement> = {
  placeholder: string;
  value?: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchResults?: Array<T>;
  onClick?: (input: T) => void;
  submitButton?: boolean;
  submitLogic?: () => void;
};
export const DebouncedSearchBar = <T extends SearchElement>({
  placeholder,
  value,
  setSearch,
  searchResults,
  onClick,
  submitButton,
  submitLogic,
}: DebouncedSearchBarProps<T>) => {
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
    <div className="relative mr-3 w-full max-w-xs md:max-w-sm lg:max-w-md">
      <SearchBar
        placeholder={placeholder}
        tabIndex={0}
        onChange={handleSearch}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 300)}
        submitButton={submitButton}
        submitLogic={submitLogic}
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
  );
};
export default DebouncedSearchBar;
