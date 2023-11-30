'use client';

import Image from 'next/image';
import { type Dispatch, type SetStateAction } from 'react';
import MobileNavItem from './MobileNavItem';
import { usePathname } from 'next/navigation';

const mainCats = ['Home', 'History', 'Liked', 'Events'] as const;
const moreCats = ['Settings', 'About', 'Feedback'] as const;

type allCats = (typeof mainCats)[number] | (typeof moreCats)[number];
const routeMap: {
  [key in allCats[number]]: string;
} = {
  Home: '/',
  History: '/history',
  Liked: '/liked',
  Events: '/events',
  Settings: '/settings',
  About: '/about',
  Feedback: '/feedback',
};

const MobileNavMenu = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className="fixed left-0 top-0 z-50 h-screen w-full bg-black bg-opacity-50"
      ></div>
      <nav className="p-y fixed left-0 top-0 z-50 h-screen bg-slate-100 md:hidden">
        <div className="flex w-full place-content-center items-center pb-7 pt-10">
          <Image
            src="/nebula-logo.png"
            alt=""
            width={60}
            height={60}
            className="mr-1.5"
          />
          <h1 className=" text-2xl font-medium">Jupiter</h1>
        </div>
        <div className="w-full px-5 py-5">
          <h1 className="px-4 text-xs font-light capitalize text-slate-500">
            Main Categories
          </h1>
          <div className="mb-5 mt-6">
            {mainCats.map((cat) => (
              <MobileNavItem
                key={cat}
                active={pathname === routeMap[cat]}
                cat={cat}
              />
            ))}
          </div>
        </div>
        <div className="w-full py-5 pl-5">
          <h1 className="px-4 text-xs font-light capitalize text-slate-500">
            More
          </h1>
          <div className="mb-5 mt-6">
            {moreCats.map((cat) => (
              <MobileNavItem
                key={cat}
                active={pathname === routeMap[cat]}
                cat={cat}
              />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileNavMenu;
