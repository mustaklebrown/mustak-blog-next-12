import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query?.id);

  const session = await getSession({ req });

  if (req.method == 'GET') {
    const post = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
      include: {
        posts: {
          include: {
            comments: true,
            category: true,
            author: true,
          },
          orderBy: {
            createAt: 'desc',
          },
        },
        Comment: true,
      },
    });
    res.status(200).json(post);
  } else {
    res.json({ message: 'Unauthorized' });
  }
}
