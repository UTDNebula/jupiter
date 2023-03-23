import { NextApiRequest, NextApiResponse } from 'next';
import DbProvider from '../../backend_tools/db_provider';

// This handler only handles GET requests
// Can be expanded to handle POST requests
// Takes in a name in the parameters and returns all clubs with that name based on the provider function
// Prevents exposing the database to the frontend
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  dbProvider: DbProvider = new DbProvider(),
) {
  try {
    const { name } = req.query;

    // Try to parse name into a string
    if (typeof name !== 'string')
      return res.status(400).json({ message: 'Bad Request' });

    const clubs = await dbProvider.getClubsByName(name);

    // Return the clubs and status code
    return res.status(200).json({ clubs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
