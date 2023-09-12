import { z } from 'zod';

const ERole = z.enum(['Student', 'Student Organizer', 'Administrator']);
export default ERole;
export type Role = z.infer<typeof ERole>;
