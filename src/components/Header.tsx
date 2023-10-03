/* eslint-disable react/jsx-no-undef */
import type { ReactNode } from 'react';
import { useState } from 'react';
import { ClubSearchBar, EventSearchBar } from './SearchBar';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const BaseHeader = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  return (
    <div className="flex h-20 w-full flex-row content-between items-center justify-start px-5 py-2.5">
      {children}
      <div className="ml-auto flex items-center justify-center pr-[8%]">
        {status === 'authenticated' ? (
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

const ProfileDropDown = ({ image }: { image: string }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        onClick={() => console.log('dropdown clicked')}
        asChild
      >
        {image !== '' ? (
          <Image
            src={image}
            className="h-10 w-10 rounded-full bg-gray-300"
            alt=""
            height={100}
            width={100}
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-300" />
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mt-2 w-44 rounded-md border-2 border-black bg-slate-200 text-center">
          <DropdownMenu.Item
            className="p-2 hover:cursor-pointer"
            onClick={() => void signOut()}
          >
            <button>Signout</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
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
