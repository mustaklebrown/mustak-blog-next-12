import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
// import { blogs } from '../../data/data';
import { getSession } from 'next-auth/react';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    const category = await prisma.category.findMany({});
    res.json(category);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
