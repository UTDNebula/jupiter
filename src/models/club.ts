import type Contacts from './contacts';
import type Event from './event';

interface Club {
  name: string;
  events?: Event[]; //references to other events
  description: string;
  contacts: Contacts;
  tags?: string[];
  image?: string;
  id: string;
}

export default Club;

export const getImage = (club: Club) => {
  return club.image || '/nebula-logo.png';
};

export const getTags = (club: Club) => {
  return club.tags || [];
};
