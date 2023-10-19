import Link from 'next/link';
import type { ReactNode } from 'react';
import { ProfileDropDown } from './Header';
import { getServerAuthSession } from '@src/server/auth';
import { ClubSearchBar, EventSearchBar } from './SearchBar';

export const BaseHeader = async ({ children }: { children: ReactNode }) => {
  const session = await getServerAuthSession();

  return (
    <div className="flex h-20 w-full flex-row content-between items-center justify-start px-5 py-2.5">
      {children}
      <div className="ml-auto flex items-center justify-center">
        {session !== null ? (
          <div className="h-10 w-10 rounded-full">
            <ProfileDropDown image={session.user.image || ''} />
          </div>
        ) : (
          <div className="flex w-32 justify-between">
            <Link href="/auth?signin">Sign in</Link>
            <Link href="/auth?signup">Sign up</Link>
          </div>
        )}
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
