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
  const { message, id } = req.body;
  const session = await getSession({ req });
  if (req.method === 'POST') {
    if (session) {
      try {
        const result = await prisma.comment.create({
          data: {
            message,
            Post: {
              connect: { id: id },
            },
            user: {
              connect: { email: session.user.email },
            },
          },
        });
        res.json(result);
      } catch (error) {
        console.log(error);
        res.json(error);
      }
    }
  }
  if (session) {
    if (req.method == 'DELETE') {
      if (session) {
        const post = await prisma.comment.delete({
          where: { id: id },
        });
        res.json(post);
      } else {
        res.status(401).send({ message: 'Unauthorized' });
      }
    }
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
