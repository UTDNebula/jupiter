import {
  AboutIcon,
  EventsIcon,
  FeedbackIcon,
  HistoryIcon,
  HomeIcon,
  type IconType,
  LikedIcon,
  SettingsIcon,
} from '../icons/Icons';

export const mainCats = ['Home', 'History', 'Liked', 'Events'] as const;
export const moreCats = ['Settings', 'About', 'Feedback'] as const;

export type allCats = (typeof mainCats)[number] | (typeof moreCats)[number];
export const IconMap: {
  [key in allCats[number]]: IconType;
} = {
  Home: HomeIcon,
  History: HistoryIcon,
  Liked: LikedIcon,
  Events: EventsIcon,
  Settings: SettingsIcon,
  About: AboutIcon,
  Feedback: FeedbackIcon,
};

export const routeMap: {
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
