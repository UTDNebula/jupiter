import { useRouter } from 'next/router';
import React from 'react';
import {
  AboutIcon,
  EventsIcon,
  FeedbackIcon,
  HistoryIcon,
  HomeIcon,
  IconType,
  LikedIcon,
  SettingsIcon,
} from './Icons';

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
          {mainCats.map((cat, key) => {
            const Icon = IconMap[cat];
            return (
              <div
                key={key}
                className={`${
                  router.pathname === routeMap[cat]
                    ? 'bg-white shadow-md scale-105'
                    : 'bg-transparent'
                } w-64 h-10 flex items-center justify-start px-3 cursor-pointer rounded-lg transition-transform`}
                onClick={() => router.push(routeMap[cat])}
              >
                {Icon && (
                  <Icon
                    fill={`${
                      router.pathname === routeMap[cat]
                        ? 'fill-blue-400'
                        : 'fill-slate-500'
                    }`}
                  />
                )}
                <h1
                  className={`text-sm font-medium capitalize ${
                    router.pathname === routeMap[cat]
                      ? 'text-blue-400'
                      : 'text-slate-500'
                  }`}
                >
                  {cat}
                  {/* Small chevron here :) */}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full py-5 pl-5">
        <h1 className="text-xs font-light capitalize text-slate-500">More</h1>
        <div className="my-2">
          {moreCats.map((cat, key) => {
            const Icon = IconMap[cat];
            return (
              <div
                key={key}
                className={`${
                  router.pathname === routeMap[cat]
                    ? 'bg-white text-blue-400 shadow-md scale-105'
                    : 'bg-transparent'
                } w-64 h-10 flex items-center justify-start px-3 cursor-pointer rounded-lg transition-transform`}
                onClick={() => router.push(routeMap[cat])}
              >
                {Icon && (
                  <Icon
                    fill={`${
                      router.pathname === routeMap[cat]
                        ? 'fill-blue-400'
                        : 'fill-slate-500'
                    }`}
                  />
                )}
                <h1
                  className={`text-sm font-medium capitalize ${
                    router.pathname === routeMap[cat]
                      ? 'text-blue-400'
                      : 'bg-transparent text-slate-500'
                  }`}
                >
                  {cat}
                  {/* Small chevron here :) */}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
