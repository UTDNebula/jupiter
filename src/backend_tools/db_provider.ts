import {
  doc,
  type Firestore,
  getFirestore,
  setDoc,
  updateDoc,
  addDoc,
  getDoc,
  type DocumentData,
  getDocs,
  deleteDoc,
  collection,
  arrayUnion,
  query,
} from 'firebase/firestore';
import type Club from '../models/club';
import type User from '../models/user';
import FirebaseApp from './firebase';
import type Event from '../models/event';
import Fuse from 'fuse.js';

class DbProvider {
  db: Firestore = getFirestore(FirebaseApp);
  userPath = 'Users';
  clubPath = 'Clubs';
  eventPath = 'Events';
  async createUser(user: User): Promise<string | undefined> {
    try {
      const userCollection = collection(this.db, this.userPath);
      const ref = await addDoc(userCollection, user);
      return ref.id;
    } catch (error) {
      console.error(`failure saving user, got error: ${JSON.stringify(error)}`);
      return undefined;
    }
  }

  async createClub(club: Club): Promise<string | undefined> {
    try {
      const docu = doc(this.db, this.clubPath, club.name);

      await setDoc(docu, club);

      return club.name;
    } catch (error) {
      console.error(`failure saving club, got error: ${JSON.stringify(error)}`);
      return undefined;
    }
  }

  async getUser(userid: string): Promise<User | undefined> {
    const userReference = doc(this.db, this.userPath, userid);
    const ref = await getDoc<DocumentData>(userReference);
    return ref.data() as User;
  }

  async getClubById(id: string): Promise<Club> {
    const clubReference = doc(this.db, this.clubPath, id);
    const ref = await getDoc<DocumentData>(clubReference);
    return {
      ...(ref.data() as Club),
      id: ref.id,
    };
  }

  async getAllClubs(): Promise<Club[] | null> {
    const clubRef = collection(this.db, this.clubPath);
    const q = query(clubRef);
    const snapshot = await getDocs(q);
    try {
      const documentList: Club[] = snapshot.docs.map((doc) => {
        return {
          ...(doc.data() as Club),
          id: doc.id,
        };
      });
      return documentList;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getClubsByName(name: string): Promise<Club[]> {
    const clubs = await this.getAllClubs();
    if (!clubs) return [];
    if (name === '') return clubs;
    const fuse = new Fuse(clubs, { keys: ['name'] });
    const result = fuse.search(name);
    return result.map((club) => club.item);
  }

  async deleteClub(club_name: string): Promise<boolean> {
    const docRef = doc(this.db, this.clubPath, club_name);
    await deleteDoc(docRef);
    return true;
  }

  async deleteUser(_: string) {
    await Promise.all([]);
    throw new Error('not implemented');
  }

  private async createEvent(event: Event) {
    //this function is a bit more tricky, we need to update that this club has an event
    //and we need to create the event in our db
    //save event into db
    const eventsCollection = collection(this.db, this.eventPath);
    const eventRef = addDoc(eventsCollection, event);

    //update club
    const club = doc(this.db, this.clubPath, event.hostclub);
    await updateDoc(club, {
      events: arrayUnion(eventRef),
    });
  }

  private async deleteEvent(eventId: string) {
    const docRef = doc(this.db, this.eventPath, eventId);
    await deleteDoc(docRef);
  }

  private async getEventRefsFromClub(clubName: string) {
    throw new Error('Unfinished');

    const club = await this.getClubById(clubName);
    return club.events;
  }
}
export default DbProvider;
