import SidebarItems from './SidebarItems';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';

const mainCats = ['Home', 'History', 'Liked', 'Events'] as const;
const moreCats = ['Settings', 'About', 'Feedback'] as const;

type union = (typeof mainCats)[number] | (typeof moreCats)[number];
const routeMap: {
  [key in union[number]]: string;
} = {
  Home: '/',
  History: '/history',
  Liked: '/liked',
  Events: '/events',
  Settings: '/settings',
  About: '/about',
  Feedback: '/feedback',
};

// Keep in mind that in all routes we need pl-72 for the sidebar
const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="absolute hidden h-full w-72 bg-slate-100 md:block">
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
            <SidebarItems
              key={cat}
              active={router.pathname === routeMap[cat]}
              cat={cat}
            />
          ))}
        </div>
      </div>
      <div className="w-full px-5 py-5">
        <h1 className="px-4 text-xs font-light capitalize text-slate-500">
          More
        </h1>
        <div className="mb-5 mt-6">
          {moreCats.map((cat) => (
            <SidebarItems
              key={cat}
              active={router.pathname === routeMap[cat]}
              cat={cat}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
