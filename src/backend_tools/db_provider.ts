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
import FirebaseApp from './firebase';
import Fuse from 'fuse.js';
import IUser, { type User } from '@src/models/user';
import IClub, { type Club } from '@src/models/club';
import { type Event } from '@src/models/event';

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
    const user = IUser.parse({ id: ref.id, ...ref.data() });
    return user;
  }

  async getClubById(id: string): Promise<Club> {
    const clubReference = doc(this.db, this.clubPath, id);
    const ref = await getDoc<DocumentData>(clubReference);
    const club = IClub.parse({ id: ref.id, ...ref.data() });
    return club;
  }

  async getAllClubs(): Promise<Club[] | null> {
    const clubRef = collection(this.db, this.clubPath);
    const q = query(clubRef);
    const snapshot = await getDocs(q);
    const clubs: Club[] = [];
    snapshot.forEach((doc) => {
      const club = IClub.parse({ id: doc.id, ...doc.data() });
      clubs.push(club);
    });
    return clubs;
  }

  async getClubsByName(name: string): Promise<Club[]> {
    const clubs = await this.getAllClubs();
    if (!clubs) return [];
    if (name === '') return clubs;

    // IDK why typescript is complaining about this but this is the fix :)
    let fuse: Fuse<Club> | null = null;
    fuse = new Fuse(clubs, {
      keys: ['name'],
    });

    const result = fuse.search(name);
    // Change to return top 5 results
    return result.map((club) => club.item).slice(0, Math.min(5, result.length));
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
    const club = doc(this.db, this.clubPath, event.hostClub);
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
