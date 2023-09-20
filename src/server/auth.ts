import { type GetServerSidePropsContext } from 'next';
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { certFile, env } from '@src/env.mjs';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import DbProvider from '@src/backend_tools/db_provider';
import { Adapter } from 'next-auth/adapters';
import { User } from '@src/models/user';
import { type Firestore } from 'firebase/firestore';
import { cert } from 'firebase-admin/app';
import { z } from 'zod';

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
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

const dbProvider = new DbProvider();

type CertFileType = z.infer<typeof certFile>;

console.log('in auth.ts');

export const authOptions: NextAuthOptions = {
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: (JSON.parse(env.JUPITER_CERT_FILE) as CertFileType)
        .client_email,
      privateKey: (JSON.parse(env.JUPITER_CERT_FILE) as CertFileType)
        .private_key,
    }),
  }) as Adapter,
  callbacks: {
    signIn(params) {
      console.log(params);

      return true;
    },
    async session({ session, user }) {
      // Try to get the user from the database

      console.log('in callback');
      try {
        const dbUser = await dbProvider.getUser(user.id);
        return { ...session, user: { ...dbUser, ...user } };
      } catch (err) {
        console.log('Unable to find user');
      }
      // If the user exists, return the user object

      // If the user doesn't exist, create a new user in the database
      const jupiterUser: Partial<User> = {
        role: 'Student',
        first_name: user.name?.split(' ')[0],
        last_name: user.name?.split(' ')[1] ?? '',
      };

      console.log('Unknown user: ', jupiterUser);

      console.log('User:', user);
      console.log('Session User:', session.user);

      // const newUser = await dbProvider.createUser({ ...jupiterUser, career: "Engineering", );
      // userObj = { ...userObj, id: newUser };
      // // Return the new user object
      // return { ...session, user: { ...userObj, ...user } };

      if (session.user) {
        session.user.id = user.id;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
