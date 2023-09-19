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
import { useRouter } from 'next/navigation';

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

const SidebarItems: FC<{ cat: union[number]; active: boolean }> = ({
  cat,
  active,
}) => {
  const Icon = IconMap[cat];
  const router = useRouter();
  const route = routeMap[cat];

  // This should never happen
  // Just so  TS doesn't complain
  if (!route) return null;

  return (
    <div
      className={`${
        active ? 'scale-105 bg-white shadow-md' : 'bg-transparent'
      } flex h-10 w-64 cursor-pointer items-center justify-between rounded-lg px-3 transition-transform`}
      onClick={() => void router.push(route)}
    >
      <div className="flex items-center gap-x-4">
        {Icon && (
          <Icon fill={`${active ? 'fill-blue-400' : 'fill-slate-500'}`} />
        )}
        <h1
          className={`text-sm font-medium capitalize ${
            active ? 'text-blue-400' : 'text-slate-500'
          }`}
        >
          {cat}
        </h1>
      </div>
      <RightChevron />
    </div>
  );
};

export default SidebarItems;
