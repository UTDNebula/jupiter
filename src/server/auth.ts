import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import { env } from '@src/env.mjs';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db';
import { eq } from 'drizzle-orm';
import { type InsertUserMetadata } from './db/models';
import { type UserMetadata } from '@src/models/userMetadata';
import { pgTable } from 'drizzle-orm/pg-core';
import { userMetadata } from './db/schema/users';
import { JWT } from "next-auth/jwt"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      access_token?: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'] &
      UserMetadata;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}
// Extends the JWT type to add custom parameters for handling refresh token for Google Calendar 
declare module "next-auth/jwt" {
  interface JWT { 
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number; 
  }
}

export interface PreviewUser {
  id: string;
  name: string;
  email: string;
  image: string;

}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, pgTable),
  callbacks: {
    async session({ session, user, token }) {
      let metadata = await db.query.userMetadata.findFirst({
        where: (metadata) => eq(metadata.id, user.id),
      });
      if (!metadata) {
        const firstName = user.name?.split(' ')[0] ?? '';
        const lastName = user.name?.split(' ')[1] ?? '';

        const insert: InsertUserMetadata = {
          firstName,
          lastName,
          id: user.id,
          major: 'Computer Science',
        };

        metadata = (
          await db.insert(userMetadata).values(insert).returning()
        ).at(0);
      } 
      

      if (session.user) {
        session.user = { ...session.user, ...metadata }; 
        session.user.access_token = token.accessToken;
        // session.user.role = user.role; <-- put other properties on the session here
      }

      

      return session;
    }, 
    async jwt({ token, account }) {
      if (account) {
        token.accessToken  = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt    = account.expires_at
      }
      
      // Check that token is still valid 
      if ( Date.now() < (token.expiresAt || 0 ) ) { return token; }
      
      // Token needs to be refreshed
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          clientId: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: token.refreshToken!,
        }),
      })

      const refreshedToken = await response.json();
      token.accessToken    = refreshedToken.access_token;
      token.expiresAt      = Date.now() + refreshedToken.expires_in * 1000;

      return token;
    }

  },
  pages: {
    signIn: '/auth',
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email https://www.googleapis.com/auth/calendar.events"
        } 
      },
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],

  /**
   * ...add more providers here.
   *
   * Most other providers require a bit more work than the Discord provider. For example, the
   * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
   * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
   *
   * @see https://next-auth.js.org/providers/github
   */
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
