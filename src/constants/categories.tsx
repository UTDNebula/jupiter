import {
  AboutIcon,
  EventsIcon,
  FeedbackIcon,
  HomeIcon,
  type IconType,
  CommunityIcon,
  SettingsIcon,
} from '../icons/Icons';

export const mainCats = ['Home', 'Community', 'Events'] as const;
export const moreCats = ['Settings', 'About', 'Feedback'] as const;

export type allCats = (typeof mainCats)[number] | (typeof moreCats)[number];
export const IconMap: {
  [key in allCats[number]]: IconType;
} = {
  Home: HomeIcon,
  Community: CommunityIcon,
  Events: EventsIcon,
  Settings: SettingsIcon,
  About: AboutIcon,
  Feedback: FeedbackIcon,
};

export const routeMap: {
  [key in allCats[number]]: string;
} = {
  Home: '/',
  Community: '/community',
  Events: '/events',
  Settings: '/settings',
  About: '/about',
  Feedback: '/feedback',
};
