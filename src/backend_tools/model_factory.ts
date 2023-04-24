import { type Career } from '@src/models/career';
import IClub, { type Club } from '@src/models/club';
import { type Contacts } from '@src/models/contacts';
import { type Role } from '@src/models/role';
import { type User } from '@src/models/user';
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

  static buildUser(
    first_name: string,
    last_name: string,
    major: string,
    year: Year = 'Freshman',
    role: Role = 'Student',
    career: Career = 'Engineering',
  ): User {
    const user: User = {
      first_name: first_name,
      last_name: last_name,
      major: major,
      year: year,
      role: role,
      career: career,
    };
    return user;
  }

  static buildEvent() {
    throw new Error('Unimplemented');
  }
}

export default Factory;
