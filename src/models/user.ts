import { z } from 'zod';
import Career from './career';
import Club from './club';
import Role from './role';
import Year from './year';

const IUser = z.object({
  first_name: z.string(),
  last_name: z.string(),
  major: z.string(),
  minor: z.string().optional(),
  year: Year,
  role: Role,
  career: Career,
  clubs: z.array(Club).optional(),
});

export default IUser;
export type User = z.infer<typeof IUser>;
