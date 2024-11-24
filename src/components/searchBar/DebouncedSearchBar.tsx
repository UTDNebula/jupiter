'use client';
import {
  useState,
  type ChangeEvent,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type KeyboardEvent,
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
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(input);
      setSelectedIndex(-1);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [input, setSearch]);

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(Math.min(selectedIndex + 1, searchResults?.length ?? 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(Math.max(selectedIndex - 1, 0));
        break;
      case 'Enter':
        const selectedItem = searchResults?.[selectedIndex];
        if (selectedItem) {
          onClick?.(selectedItem);
        }
        break;
    }
  }

  return (
    <div
      className="relative mr-3 w-full max-w-xs md:max-w-sm lg:max-w-md"
      onKeyDown={handleKeyDown}
    >
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
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[300px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          {searchResults.map((item, i) => (
            <button
              type="button"
              key={item.id}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-150
                ${selectedIndex === i
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
                }
                ${i !== searchResults.length - 1 ? 'border-b border-gray-100' : ''}
              `}
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
