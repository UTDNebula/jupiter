import { relations, sql } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { events } from './events';
import { userMetadataToClubs } from './users';
import { contacts } from './contacts';

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
});

export const clubRelations = relations(club, ({ many }) => ({
  contacts: many(contacts),
  events: many(events),
  userMetadataToClubs: many(userMetadataToClubs),
}));
