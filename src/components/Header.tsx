/* eslint-disable react/jsx-no-undef */
import { type ReactNode } from 'react';
import { ClubSearchBar, EventSearchBar } from './SearchBar';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

const BaseHeader = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  return (
    <div className="flex h-20 w-full flex-row content-between items-center justify-start px-5 py-2.5">
      {children}
      <div className="ml-auto flex items-center justify-center">
        {status === 'authenticated' ? (
          <div className="h-10 w-10 rounded-full">
            {session.user.image !== '' && session.user.image ? (
              <Image
                src={session.user.image || ''}
                className="h-10 w-10 rounded-full bg-gray-300"
                alt=""
                height={100}
                width={100}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-300" />
            )}
          </div>
        ) : (
          <>
            <Link href="/auth">Sign in</Link>
            <Link href="/auth">Sign up</Link>
          </>
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
