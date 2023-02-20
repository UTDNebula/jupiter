import { DocumentReference, DocumentData } from "firebase/firestore"
import Contacts from "./contacts"
import Event from "./event"

interface Club {
    name: string
    events?: Event[] //references to other events
    description: string,
    contacts: Contacts
}

export default Club