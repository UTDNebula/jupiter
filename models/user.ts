import type Career from './career';
import type Club from './club';
import type Role from './role';
import type Year from './year';

interface User {
  first_name: string;
  last_name: string;
  major: string;
  minor?: string;
  year: Year;
  role: Role;
  career: Career;
  clubs?: Club[];
}

export default User;
