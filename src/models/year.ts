import { z } from 'zod';

const EYear = z.enum([
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Grad Student',
]);

export default EYear;
export type Year = z.infer<typeof EYear>;
