import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { posts } from '../../../data/data';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query?.comment);

  const session = await getSession({ req });

  if (session) {
    if (req.method == 'DELETE') {
      if (session) {
        const post = await prisma.comment.delete({
          where: { id: id as number },
        });
        res.json(post);
      } else {
        res.status(401).send({ message: 'Unauthorized' });
      }
    }
  }
  if (req.method === 'GET') {
    const comments = await prisma.comment.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        postId: id as number,
      },
      include: {
        user: true,
        Post: true,
      },
    });
    res.status(200).json(comments);
  }
}
