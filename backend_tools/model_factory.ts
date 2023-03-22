import { DocumentReference, DocumentData } from "firebase/firestore"
import Career from "../models/career";
import Club from "../models/club"
import Contacts from "../models/contacts"
import Role from "../models/role";
import User from "../models/user";
import Year from "../models/year";


class Factory {
    static buildClub(name: string, description: string, contacts: Contacts): Club {
        const club: Club = { name: name, description: description, contacts: contacts }
        return club;
    }

    static buildUser(first_name: string, last_name: string, major: string, year: Year = Year.freshman, role: Role = Role.Student, career: Career = Career.Engineering): User {
        const user: User = {
            first_name: first_name,
            last_name: last_name,
            major: major,
            year: year,
            role: role,
            career: career
        }
        return user
    }

    static buildEvent() {
        throw new Error("Unimplemented")
    }

}

export default Factory