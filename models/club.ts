import { DocumentReference, DocumentData } from 'firebase/firestore';
import Contacts from './contacts';
import Event from './event';

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
