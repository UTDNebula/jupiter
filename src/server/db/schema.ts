import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters';
import { relations, sql } from 'drizzle-orm';

export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const club = pgTable('club', {
  id: text('id')
    .default(sql`nanoid(20)`)
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image').default('/nebula-logo.png').notNull(),
});

const platformEnum = pgEnum('platform', [
  'discord',
  'youtube',
  'twitch',
  'facebook',
  'twitter',
  'instagram',
  'website',
  'email',
  'other',
]);

export const contacts = pgTable(
  'contacts',
  {
    platform: platformEnum('platform').notNull(),
    url: text('url').notNull(),
    clubId: text('clubId')
      .notNull()
      .references(() => club.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey(table.platform, table.clubId),
  }),
);

export const contactsRelation = relations(contacts, ({ one }) => ({
  club: one(club, { fields: [contacts.clubId], references: [club.id] }),
}));

export const clubRelation = relations(club, ({ many }) => ({
  contacts: many(contacts),
}));
