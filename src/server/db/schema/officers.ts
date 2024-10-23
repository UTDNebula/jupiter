import { relations } from 'drizzle-orm';
import { pgTable, text, boolean, primaryKey } from 'drizzle-orm/pg-core';
import { club } from './club';

export const officers = pgTable(
  'officers',
  {
    id: text('id').notNull(),
    clubId: text('club_id')
      .notNull()
      .references(() => club.id),
    name: text('name').notNull(),
    position: text('position').notNull(),
    image: text('image').default('/nebula-logo.png').notNull(),
    isPresident: boolean('is_president').default(false).notNull(),
  },
  (table) => ({
    pk: primaryKey(table.clubId, table.id),
  }),
);

export const officersToClubs = relations(officers, ({ one }) => ({
  club: one(club, { fields: [officers.clubId], references: [club.id] }),
}));
