import { NextApiRequest, NextApiResponse } from 'next';
import DbProvider from '../../backend_tools/db_provider';

// This handler only handles GET requests
// Can be expanded to handle POST requests
// Takes in a name in the parameters and returns all clubs with that name based on the provider function
// Prevents exposing the database to the frontend
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Get the name from request
  const name = req.query['name'];

  // Check if name is valid
  if (!name || name instanceof Array) {
    req.statusCode = 400;
    return res.json('Invalid name provided');
  }

  const db = new DbProvider();
  const clubs = await db.getClubsByName(name);

  // Return the clubs and status code
  req.statusCode = 200;
  return res.send({ clubs });
}
