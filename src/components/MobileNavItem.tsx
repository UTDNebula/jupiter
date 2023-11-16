'use client';

import React, { type FC, useState } from 'react';
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
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

const MobileNavItem: FC<{ cat: union[number]; active: boolean }> = ({
  cat,
  active,
}) => {
  const Icon = IconMap[cat];
  const route = routeMap[cat];

  if (!route) return null;

  return (
    <div
      className={`${
        active
          ? `-my-2.5 mb-2.5 rounded-3xl bg-white py-2.5 shadow-md last:-mb-2.5`
          : 'mb-5'
      }`}
    >
      <Link
        className=" 
        flex h-full w-64 cursor-pointer  items-start rounded-lg bg-transparent px-5 text-sm transition-transform"
        href={route}
        passHref
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
      </Link>
    </div>
  );
};

export default MobileNavItem;
