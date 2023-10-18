'use client';
import { ClubSearchBar, EventSearchBar } from './SearchBar';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import BaseHeader from './BaseHeader';

export const ProfileDropDown = ({ image }: { image: string }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        // onClick={() => console.log('dropdown clicked')}
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
            <button>Sign out</button>
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
