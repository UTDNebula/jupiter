import SidebarItems from './SidebarItems';
import { useRouter } from 'next/router';
import React from 'react';

const mainCats = ['Home', 'History', 'Liked', 'Events'] as const;
const moreCats = ['Settings', 'About', 'Feedback'] as const;

type union = typeof mainCats[number] | typeof moreCats[number];
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
    <div className="h-full w-72 bg-slate-100 absolute z-10 md:block hidden">
      <div className="w-full py-10">
        <h1 className="text-2xl font-medium text-center">Jupiter</h1>
      </div>
      <div className="w-full py-5 pl-5">
        <h1 className="text-xs font-light capitalize text-slate-500">
          Main Categories
        </h1>
        <div className="my-2">
          {mainCats.map((cat) => (
            <SidebarItems
              key={cat}
              active={router.pathname === routeMap[cat]}
              cat={cat}
            />
          ))}
        </div>
      </div>
      <div className="w-full py-5 pl-5">
        <h1 className="text-xs font-light capitalize text-slate-500">More</h1>
        <div className="my-2">
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
