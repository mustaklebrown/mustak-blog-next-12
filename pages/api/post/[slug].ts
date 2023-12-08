import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { posts } from '../../../data/data';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query?.slug;

  const session = await getSession({ req });

  if (req.method == 'GET') {
    const post = await prisma.post.findFirst({
      where: {
        slug: slug as string,
      },
      include: {
        author: {
          select: { name: true, email: true, id: true },
        },
        category: {
          select: { name: true },
        },
        comments: {
          select: {
            message: true,
            user: true,
            id: true,
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
    });
    res.status(200).json(post);
  }
  if (req.method == 'DELETE') {
    if (session) {
      const post = await prisma.post.delete({
        where: { slug: slug as string },
      });
      res.json(post);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  }
  if (req.method === 'PUT') {
    if (session) {
      try {
        const { title, content, imageUrl, category, excerpt } = req.body;
        const result = await prisma.post.update({
          where: {
            slug: slug as string,
          },
          data: {
            title,
            content,
            imageUrl,
            excerpt,
            author: { connect: { email: session?.user?.email! } },
          },
        });
        res.json(result);
      } catch (error) {
        console.log(error);
        res.json(error);
      }
    }
  }
}
