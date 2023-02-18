import { DocumentReference, DocumentData } from "firebase/firestore"
import Contacts from "./contacts"

interface Club {
    name: string
    events?: DocumentReference<DocumentData>[] //references to other events
    description: string,
    contacts: Contacts
}

export default Club