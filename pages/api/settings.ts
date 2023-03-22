import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import DbProvider from '../../backend_tools/db_provider';
import User from '../../models/user';
import { authOps } from './auth/[...nextauth]';

// This API route will take in a user partial from the request
// and update the user in the database
const Handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db_provider = new DbProvider(),
) => {
  // MAKE SURE TO CHECK IF THE USER IS AUTHENTICATED BEFORE
  const session = await getServerSession(req, res, authOps);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const { user_id } = req.query;
  const user = JSON.parse(req.body);

  // Check that the user_id and user are present
  if (!user_id || !user)
    return res.status(400).json({ error: 'Missing user_id or user' });

  // Check that the user_id is a string
  if (typeof user_id !== 'string')
    return res.status(400).json({ error: 'user_id must be a string' });

  // Check that user is an object and is a valid partial user
  if (!isUser(user))
    return res.status(400).json({ error: 'user must be a valid user' });

  // Fetch the user from the database
  const dbUser = await db_provider.getUser(user_id);

  // Check that the user exists
  if (!dbUser) return res.status(400).json({ error: 'Could not find user' });

  // Update the user in the database
  if (await db_provider.updateUser(user_id, user))
    return res.status(200).json({ success: 'Successfully updated' });

  // If the user could not be updated, return an error
  return res.status(400).json({ error: 'Could not update user' });
};

function isUser(user: unknown): user is Partial<User> {
  // Check that user is an object
  if (typeof user !== 'object' || user === null) return false;

  return true;
}

export default Handler;
