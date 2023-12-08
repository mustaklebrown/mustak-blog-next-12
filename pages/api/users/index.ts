import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
// import { blogs } from '../../data/data';
import { getSession } from 'next-auth/react';

// POST /api/post
// Required fields in body: title
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    const posts = await prisma.user.findMany({});
    res.json(posts);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
