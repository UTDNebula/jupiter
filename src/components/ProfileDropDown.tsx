'use client';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';

type Props = {
  image: string;
  isAdmin: boolean;
};

export const ProfileDropDown = ({ image, isAdmin }: Props) => {
  const router = useRouter();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {image !== '' ? (
          <Image
            src={image}
            className="h-10 w-10 rounded-full bg-gray-300 shadow-sm"
            alt="Profile Image"
            height={40}
            width={40}
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-300" />
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mt-2 w-48 rounded-md border-gray-300 bg-slate-200 text-center shadow-md transition-all">
          <DropdownMenu.Item
            className="p-3 transition-all hover:cursor-pointer hover:bg-slate-300"
            onClick={() => void signOut()}
          >
            <button>Sign out</button>
          </DropdownMenu.Item>
          {isAdmin && (
            <DropdownMenu.Item
              className="p-3 transition-all hover:cursor-pointer hover:bg-slate-300"
              onClick={() => router.push('/admin')}
            >
              <button>Admin</button>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
