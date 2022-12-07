import { DocumentReference, DocumentData } from "firebase/firestore"

interface Club {
    name: string
    events?: DocumentReference<DocumentData>[] //references to other events
}

export default Club