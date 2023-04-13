import { DocumentReference, DocumentData } from 'firebase/firestore';
import Contacts from './contacts';
import Event from './event';

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
