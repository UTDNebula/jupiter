import type Contacts from './contacts';
import type Event from './event';

interface Club {
  name: string;
  events?: Event[]; //references to other events
  description: string;
  contacts: Contacts;
  imageLink?: string;
  id: string;
}

export default Club;

export const getImageLink = (club: Club) => {
  return club.imageLink || 'https://via.placeholder.com/150';
};
