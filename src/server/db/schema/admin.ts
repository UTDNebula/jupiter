import { pgTable, text } from 'drizzle-orm/pg-core';
import { userMetadata } from './users';
import { relations } from 'drizzle-orm';

export const admin = pgTable('admin', {
  userId: text('userId')
    .notNull()
    .references(() => userMetadata.id, {
      onDelete: 'cascade',
      onUpdate: 'no action',
    }),
});

export const adminRelations = relations(admin, ({ one }) => ({
  user: one(userMetadata),
}));
