'use client';
import React, { type FC } from 'react';
import {
  AboutIcon,
  EventsIcon,
  FeedbackIcon,
  HistoryIcon,
  HomeIcon,
  type IconType,
  LikedIcon,
  RightChevron,
  SettingsIcon,
} from './Icons';
import { useRouter, usePathname } from 'next/navigation';

const mainCats = ['Home', 'History', 'Liked', 'Events'] as const;
const moreCats = ['Settings', 'About', 'Feedback'] as const;

type union = (typeof mainCats)[number] | (typeof moreCats)[number];
const IconMap: {
  [key in union[number]]: IconType;
} = {
  Home: HomeIcon,
  History: HistoryIcon,
  Liked: LikedIcon,
  Events: EventsIcon,
  Settings: SettingsIcon,
  About: AboutIcon,
  Feedback: FeedbackIcon,
};

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

const SidebarItems: FC<{ cat: union[number] }> = ({ cat }) => {
  const Icon = IconMap[cat];
  const router = useRouter();
  const route = routeMap[cat];
  const pathName = usePathname();
  const active = pathName === route;

  // This should never happen
  // Just so  TS doesn't complain
  if (!route) return null;

  return (
    <div
      className={`${
        active ? ' -my-2.5 rounded-3xl bg-white py-2.5 shadow-md' : 'my-5'
      }`}
    >
      <div
        className="
        flex h-full w-64 cursor-pointer items-start  rounded-lg bg-transparent px-5 text-sm transition-transform"
        onClick={() => void router.push(route)}
      >
        <div className="flex items-center gap-x-4">
          {Icon && (
            <Icon fill={`${active ? 'fill-blue-primary' : 'fill-slate-500'}`} />
          )}
          <h1
            className={`text-sm font-medium capitalize ${
              active ? 'text-blue-primary' : 'text-slate-500'
            }`}
          >
            {cat}
          </h1>
        </div>
        <div className="ml-auto">
          <RightChevron />
        </div>
      </div>
    </div>
  );
};

export default SidebarItems;
