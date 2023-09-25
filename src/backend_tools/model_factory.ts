import { type Career } from '@src/models/career';
import IClub, { type Club } from '@src/models/club';
import { type Contacts } from '@src/models/contacts';
import { type Role } from '@src/models/role';
import { type UserMetadata } from '@src/models/userMetadata';
import { type Year } from '@src/models/year';

class Factory {
  static buildClub(
    name: string,
    description: string,
    contacts: Contacts,
    id: string,
  ): Club {
    const club = IClub.parse({
      name: name,
      description: description,
      contacts: contacts,
      id,
    });

    return club;
  }

  static buildUserMetadata(
    first_name: string,
    last_name: string,
    major: string,
    year: Year = 'Freshman',
    role: Role = 'Student',
    career: Career = 'Engineering',
  ): UserMetadata {
    const userMetadata: UserMetadata = {
      first_name: first_name,
      last_name: last_name,
      major: major,
      year: year,
      role: role,
      career: career,
    };
    return userMetadata;
  }

  static buildEvent() {
    throw new Error('Unimplemented');
  }
}

export default Factory;
