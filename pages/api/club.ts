import { NextApiRequest, NextApiResponse } from 'next';
import DbProvider from '../../backend_tools/db_provider';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Get the name from request
  const name = req.query['name'];

  if (!name || name instanceof Array) {
    req.statusCode = 400;
    return res.json('Invalid name provided');
  }

  const db = new DbProvider();
  const clubs = await db.getClubsByName(name);
  console.log(clubs);

  req.statusCode = 200;
  return res.send({ clubs });
}
