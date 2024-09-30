import { SearchIcon } from '@src/icons/Icons';
import { ComponentProps } from 'react';

type SearchBarProps = Omit<ComponentProps<'input'>, 'type'>;

export const SearchBar = (props: SearchBarProps) => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 flex items-center pl-3">
        <SearchIcon />
      </span>
      <input
        {...props}
        type="text"
        className={`h-10 w-full rounded-full border pl-10 pr-3 focus:outline-none ${props.className}`}
      />
    </div>
  );
};
export default SearchBar;
