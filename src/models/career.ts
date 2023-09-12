import { z } from 'zod';

const ICareer = z.enum([
  'Healthcare',
  'Art And Music',
  'Engineering',
  'Business',
  'Sciences',
  'PublicService',
]);
export default ICareer;

export type Career = z.infer<typeof ICareer>;
