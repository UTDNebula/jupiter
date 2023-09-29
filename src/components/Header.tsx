import { type ReactNode } from 'react';
import { ClubSearchBar, EventSearchBar } from './SearchBar';

const BaseHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-20 w-full flex-row content-between items-center justify-start px-5 py-2.5">
      {children}
      <div className="ml-auto flex items-center justify-center">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <BaseHeader>
      <ClubSearchBar />
    </BaseHeader>
  );
};

export const EventHeader = () => {
  return (
    <>
      <BaseHeader>
        <EventSearchBar />
      </BaseHeader>
    </>
  );
};

export default Header;
