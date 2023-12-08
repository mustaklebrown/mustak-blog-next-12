import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { posts } from '../../../data/data';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req.query?.name;

  const session = await getSession({ req });

  if (req.method === 'GET') {
    const filter = await prisma.category.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        name: name as string,
      },
      include: {
        Post: true,
      },
    });
    res.status(200).json(filter);
  }
}
