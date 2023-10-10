import { type z } from 'zod';
import { contacts, club, events, userMetadata } from './schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Schema definition for club table
export const insertClub = createInsertSchema(club);
export const selectClub = createSelectSchema(club);

export type InsertClub = z.infer<typeof insertClub>;
export type SelectClub = z.infer<typeof selectClub>;

// Schema definition for contacts table
export const insertContact = createInsertSchema(contacts);
export const selectContact = createSelectSchema(contacts);

export type InsertContact = z.infer<typeof insertContact>;
export type SelectContact = z.infer<typeof selectContact>;

// Schema definition for events table
export const insertEvent = createInsertSchema(events);
export const selectEvent = createSelectSchema(events);

export type InsertEvent = z.infer<typeof insertEvent>;
export type SelectEvent = z.infer<typeof selectEvent>;

export const insertUserMetadata = createInsertSchema(userMetadata);

export type InsertUserMetadata = z.infer<typeof insertUserMetadata>;
