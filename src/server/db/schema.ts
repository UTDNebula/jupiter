import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from 'next-auth/adapters';
import { relations, sql } from 'drizzle-orm';

export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const yearEnum = pgEnum('year', [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Grad Student',
]);

export const roleEnum = pgEnum('role', [
  'Student',
  'Student Organizer',
  'Administrator',
]);

export const careerEnum = pgEnum('career', [
  'Healthcare',
  'Art and Music',
  'Engineering',
  'Business',
  'Sciences',
  'Public Service',
]);

export const userMetadata = pgTable('user_metadata', {
  id: text('id').notNull().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  major: text('major').notNull(),
  minor: text('minor'),
  year: yearEnum('year')
    .$default(() => 'Freshman')
    .notNull(),
  role: roleEnum('role')
    .$default(() => 'Student')
    .notNull(),
  career: careerEnum('career').$default(() => 'Engineering'),
});

export const userMetadataToClubs = pgTable(
  'user_metadata_to_clubs',
  {
    userId: text('user_id')
      .notNull()
      .references(() => userMetadata.id),
    clubId: text('club_id')
      .notNull()
      .references(() => club.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.clubId),
  }),
);

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
  tags: text('tags')
    .array()
    .default(sql`'{}'::text[]`)
    .notNull(),
});

export const events = pgTable('events', {
  id: text('id')
    .default(sql`nanoid(20)`)
    .primaryKey(),
  clubId: text('club_id')
    .notNull()
    .references(() => club.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  startTime: timestamp('start_time', { withTimezone: true }).notNull(),
  endTime: timestamp('end_time', { withTimezone: true }).notNull(),
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
    clubId: text('club_id')
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

export const eventsRelation = relations(events, ({ one }) => ({
  club: one(club, { fields: [events.clubId], references: [club.id] }),
}));

export const clubRelations = relations(club, ({ many }) => ({
  contacts: many(contacts),
  events: many(events),
  userMetadataToClubs: many(userMetadataToClubs), // for many-many relation
}));

// connects userMetadata table to junction table
export const userMetadataRelation = relations(userMetadata, ({ many }) => ({
  clubs: many(userMetadataToClubs),
}));

// connects junction table to userMetadata and club table
export const userMetadataToClubsRelations = relations(
  userMetadataToClubs,
  ({ one }) => ({
    club: one(club, {
      fields: [userMetadataToClubs.clubId],
      references: [club.id],
    }),
    userMetadata: one(userMetadata, {
      fields: [userMetadataToClubs.userId],
      references: [userMetadata.id],
    }),
  }),
);
