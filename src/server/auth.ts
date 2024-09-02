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
import { eq, and } from 'drizzle-orm';
import { type InsertUserMetadata } from './db/models';
import { type UserMetadata } from '@src/models/userMetadata';
import { pgTable } from 'drizzle-orm/pg-core';
import { userMetadata } from './db/schema/users';
import { accounts } from '@src/server/db/schema/users';

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
    async session({ session, user }) {
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
        // session.user.role = user.role; <-- put other properties on the session here
      }

      // Do some Google's Refresh Token rotation stuff  
      const [googleAccount] = await db.query.accounts.findMany({
        where: (googleAccount) => and ( eq( googleAccount.userId, user.id),
                                        eq( googleAccount.provider, "google") ) 
      })

      if ( ! googleAccount ) return session // User doesn't have google Account, so no need to check

      if ( googleAccount.expires_at * 1000 < Date.now() ) return session // Token is still active 

      // Reach here, access token has expired, so try to refresh it 

      try {
        const response = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          body: new URLSearchParams({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: googleAccount.refresh_token!
          }),
        })

        const token_or_error_status = await response.json() as { token?: string, error?: string}
          
        // The above variable is an error status
        if ( !response.ok ) throw token_or_error_status 
          
        // Token_or_error is a valid token, so do some parsing 
        const newTokens = token_or_error_status as { 
          access_token: string
          expires_in: number
          refresh_token?: string
        }
          
        // Update the database and store the new refreshed access token in the database
        await db.update(accounts).set({
          access_token: newTokens.access_token,
          expires_at: Math.floor( Date.now() / 1000 + newTokens.expires_in),
          refresh_token: newTokens.refresh_token ?? googleAccount.refresh_token
        }).where(and(
          eq( accounts.provider, "google"),
          eq( accounts.providerAccountId, googleAccount.providerAccountId),
        ))
      } catch (error) {
          console.error("Error refreshing access_token!", error)
      }
      
      return session;
    },
    async signIn({account}) {
      // There's something wrong with NextAuth where it doesn't automatically save the Google's refresh token ( but it will save Discord refresh token )
      // into our database. So we have to manually save refreshToken into the database 
      
      if ( account?.provider.toLowerCase() != "google" ) return true 
      
      // Reach here, then we know the user log in with Google
      // After the user Sign in, NextAuth will automatically create the session object and user object into our database for us, 
      // so all we just have grab the correct entry and update the refresh Token column in our database 
      try {
        await db.update(accounts).set({
              refresh_token: account.refresh_token
            }).where(and(
              eq( accounts.provider, "google"),
              eq( accounts.providerAccountId, account.providerAccountId),
            ))
      } catch ( e ) { // Honestly, this code shouldn't ever run, but just for Sanity check and future debugging
        console.log("Error when trying to save refresh_token into database! Error: ", e)
        
        // We return true because we still want to the user to be able to sign in to our app. If we were unable to save the refresh token into our
        // database, it's not the end of the world, so we just continue, and hope next time user log in, we are able to save the refresh token 
      }

      return true
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
        url: "https://accounts.google.com/o/oauth2/auth",
        params: {
          scope: "https://www.googleapis.com/auth/calendar",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }
      }
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
