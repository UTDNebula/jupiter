import { z } from 'zod';

const ICareer = z.enum([
  'Healthcare',
  'Art and Music',
  'Engineering',
  'Business',
  'Sciences',
  'Public Service',
]);
export default ICareer;

export type Career = z.infer<typeof ICareer>;
