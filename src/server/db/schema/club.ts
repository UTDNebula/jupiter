import { relations, sql } from 'drizzle-orm';
import { pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import { events } from './events';
import { userMetadataToClubs } from './users';
import { contacts } from './contacts';
import { carousel } from './admin';

export const approvedEnum = pgEnum('approved_enum', [
  'approved',
  'rejected',
  'pending',
]);

export const club = pgTable('club', {
  id: text('id')
    .default(sql`nanoid(20)`)
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image').default('/nebula-logo.png').notNull(),
  tags: text('tags')
    .array()
    .default(sql`'{}'::text[]`)
    .notNull(),
  // * Approved will be null by default and will be set to true when the club is approved or false when the club is rejected
  // * This allows us to have a pending state for clubs and keep info about them in the database
  approved: approvedEnum('approved').notNull().default('pending'),
  profileImage: text('profile_image'),
});

export const clubRelations = relations(club, ({ many }) => ({
  contacts: many(contacts),
  events: many(events),
  userMetadataToClubs: many(userMetadataToClubs),
  carousel: many(carousel),
}));
