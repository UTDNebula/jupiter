import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { cert } from 'firebase-admin/app';
import serviceAccount from '../../../jupiter-cert.json';
import DbProvider from '../../../backend_tools/db_provider';
import User from '../../../models/user';
import Role from '../../../models/role';
import { AuthOptions } from 'next-auth';

const db = new DbProvider();

export const authOps: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert(serviceAccount as any),
  }),
  callbacks: {
    async session({ session, user }) {
      // Try to get the user from the database
      const dbUser = await db.getUser(user.id);
      // If the user exists, return the user object
      if (dbUser) return { ...session, user: { ...dbUser, ...user } };

      // If the user doesn't exist, create a new user in the database
      let userObj: Partial<User> = {
        role: Role.Student,
        id: user.id,
      };
      if (user.name)
        userObj = {
          ...userObj,
          first_name: user.name.split(' ')[0],
          last_name: user.name.split(' ')[1],
        };

      const newUser = await db.createUser(userObj);
      userObj = { ...userObj, id: newUser };
      // Return the new user object
      return { ...session, user: { ...userObj, ...user } };
    },
  },
};

export default NextAuth(authOps);
