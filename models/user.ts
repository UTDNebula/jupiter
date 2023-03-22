import Career from './career';
import Club from './club';
import Role from './role';
import Year from './year';

interface User {
  first_name: string;
  last_name: string;
  major: string;
  minor?: string;
  year: Year;
  role: Role;
  career: Career;
  clubs?: Club[];
  id?: string;
}

export default User;
