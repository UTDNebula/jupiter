import type { ReactNode } from 'react';
import { ProfileDropDown } from './ProfileDropDown';
import { getServerAuthSession } from '@src/server/auth';
import { ClubSearchBar } from './searchBar/ClubSearchBar';
import { EventSearchBar } from './searchBar/EventSearchBar';
import SignInButton from './signInButton';
import MobileNav from './MobileNav';
import { api } from '@src/trpc/server';

export const BaseHeader = async ({ children }: { children: ReactNode }) => {
  const session = await getServerAuthSession();
  const userCapabilities = await api.userMetadata.getUserSidebarCapabilities();
  return (
    <div className="flex h-20 w-full flex-shrink flex-row content-between items-center justify-start px-5 py-2.5">
      <MobileNav userCapabilites={userCapabilities} />
      {children}
      <div className="ml-auto flex items-center justify-center">
        {session !== null ? (
          <div className="h-10 w-10 rounded-full">
            <ProfileDropDown image={session.user.image || ''} />
          </div>
        ) : (
          <div className="mr-2">
            <SignInButton />
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
