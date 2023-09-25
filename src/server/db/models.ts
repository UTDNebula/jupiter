import { type z } from 'zod';
import { contacts, club } from './schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const insertClub = createInsertSchema(club);
export const selectClub = createSelectSchema(club);

export type InsertClub = z.infer<typeof insertClub>;
export type SelectClub = z.infer<typeof selectClub>;

export const insertContact = createInsertSchema(contacts);
export const selectContact = createSelectSchema(contacts);

export type InsertContact = z.infer<typeof insertContact>;
export type SelectContact = z.infer<typeof selectContact>;
