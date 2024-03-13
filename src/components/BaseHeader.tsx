import type { ReactNode } from 'react';
import { ProfileDropDown } from './ProfileDropDown';
import { getServerAuthSession } from '@src/server/auth';
import { ClubSearchBar, EventSearchBar } from './SearchBar';
import SignInButton from './signInButton';
import MobileNav from './MobileNav';
import { db } from '@src/server/db';
import { eq } from 'drizzle-orm';

export const BaseHeader = async ({ children }: { children: ReactNode }) => {
  const session = await getServerAuthSession();
  const isAdmin = await db.query.admin.findFirst({
    where: (admin) => eq(admin.userId, session?.user.id || ''),
  });
  return (
    <div className="flex h-20 w-full flex-shrink flex-row content-between items-center justify-start px-5 py-2.5">
      <MobileNav />
      {children}
      <div className="ml-auto flex items-center justify-center">
        {session !== null ? (
          <div className="h-10 w-10 rounded-full">
            <ProfileDropDown
              image={session.user.image || ''}
              isAdmin={isAdmin !== undefined}
            />
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
