import { doc, Firestore, getFirestore, setDoc, updateDoc, addDoc, getDoc, DocumentData, Query, where, getDocs, QueryDocumentSnapshot, query, QuerySnapshot, deleteDoc, collection, arrayUnion } from "firebase/firestore"
import Club from "../models/club";
import User from "../models/user";
import FirebaseApp from "./firebase";
import Event from "../models/event";



class DbProvider {
    db: Firestore = getFirestore(FirebaseApp)
    user_path: string = "Users"
    club_path: string = "Clubs"
    event_path: string = "Events"
    async createUser(user: User): Promise<boolean> {
        try {


            const userCollection = collection(this.db, this.user_path)
            await addDoc(userCollection, user);
            return true;
        }
        catch (error) {
            console.error(`failure saving user, got error: ${error}`);
            return false;
        }
    }

    async createClub(club: Club): Promise<boolean> {
        try {
            //const clubCollection = collection(this.db, this.club_path)
            const docu = doc(this.db, this.club_path, club.name)

            await setDoc(docu, club)

            return true;

        } catch (error) {
            console.error(`failure saving club, got error: ${error}`);
            return false
        }
    }

    async getUser(userid: string): Promise<User> {
        const userReference = doc(this.db, this.user_path, userid)
        const ref = await getDoc<DocumentData>(userReference)
        return ref.data() as unknown as User;
    }

    async getClub(club_name: string): Promise<Club> {
        const clubReference = doc(this.db, this.club_path, club_name)
        const ref = await getDoc<DocumentData>(clubReference)
        return ref.data() as Club;
    }

    async getSomeClubs(): Promise<Club[] | null> {
        const clubRef = collection(this.db, this.club_path)
        const q = query(clubRef)
        const snapshot = await getDocs(q)
        try {

            const documentList: Club[] = snapshot.docs.map(doc => doc.data() as Club)
            return documentList
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getClubsByName(name: string): Promise<Club[]
    > {
        const clubRef = collection(this.db, this.club_path)
        const q: Query<DocumentData> = query(clubRef, where("name", "==", name))
        const snapshot = await getDocs(q)
        const clubs = snapshot.docs.map(club => club.data() as Club)
        return clubs
    }

    async deleteClub(club_name: string): Promise<boolean> {
        const docRef = doc(this.db, this.club_path, club_name)
        await deleteDoc(docRef)
        return true

    }

    async deleteUser(user: string) {
        throw new Error('not implemented');
    }

    async createEvent(event: Event) {
        //this function is a bit more tricky, we need to update that this club has an event 
        //and we need to create the event in our db
        //save event into db
        const eventsCollection = collection(this.db, this.event_path)
        const eventRef = addDoc(eventsCollection, event)

        //update club
        const club = doc(this.db, this.club_path, event.hostclub)
        await updateDoc(club, {
            events: arrayUnion(eventRef)
        })
    }


    async deleteEvent(eventId: string) {
        const docRef = doc(this.db, this.event_path, eventId)
        await deleteDoc(docRef)

    }

    async getEventRefsFromClub(clubName: string) {

        throw new Error("Unfinished")

        const club = await this.getClub(clubName)
        return club.events



    }

}
export default DbProvider