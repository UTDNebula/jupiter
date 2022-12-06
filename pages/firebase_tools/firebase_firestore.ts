import { doc, Firestore, getFirestore, setDoc, updateDoc, collection, addDoc, getDoc, DocumentData, query, Query, where, getDocs, QueryDocumentSnapshot } from "firebase/firestore"
import Club from "../../models/club";
import User from "../../models/user";
import FirebaseApp from "./firebase_app";


class DbProvider {
    db: Firestore = getFirestore(FirebaseApp)
    user_path: string = "Users"
    club_path: string = "Clubs"
    async saveUser(user: User): Promise<boolean> {
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
            const clubCollection = collection(this.db, this.user_path)
            await addDoc(clubCollection, club);
            return true;

        } catch (error) {
            console.error(`failure saving club, got error: ${error}`);
            return false
        }
    }

    async getUser(userid: string): Promise<DocumentData> {
        const userReference = doc(this.db, this.user_path, userid)
        const ref = await getDoc<DocumentData>(userReference)
        return ref.data;
    }

    async getClub(clubid: string): Promise<DocumentData> {
        const clubReference = doc(this.db, this.user_path, clubid)
        const ref = await getDoc<DocumentData>(clubReference)
        return ref.data;
    }

    async getClubsByName(name: string): Promise<QueryDocumentSnapshot<DocumentData>[]> {
        const clubRef = collection(this.db, this.club_path)
        const q: Query<DocumentData> = query(clubRef, where("name", "==", name))
        const snapshot = await getDocs(q)
        return snapshot.docs
    }
}

export default DbProvider