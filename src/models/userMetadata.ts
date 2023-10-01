import { z } from 'zod';
import Career from './career';
import { selectClub as Club } from '../server/db/models';
import Role from './role';
import Year from './year';

const IUser = z.object({
  firstName: z.string(),
  lastName: z.string(),
  major: z.string(),
  minor: z.string().optional(),
  year: Year.default('Freshman'),
  role: Role.default('Student'),
  career: Career.default('Engineering'),
  clubs: z.array(Club).optional(),
});

export default IUser;
export type UserMetadata = z.infer<typeof IUser>;
