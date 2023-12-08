import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
// import { blogs } from '../../data/data';
import { getSession } from 'next-auth/react';

// POST /api/post
// Required fields in body: title
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { title, content, imageUrl, category, excerpt, slug } = req.body;
    if (req.method === 'POST') {
        const session = await getSession({ req });
        const categories = await prisma.category.findMany({});
        if (session) {
            try {
                const result = await prisma.post.create({
                    data: {
                        title,
                        content,
                        category: {
                            create: {
                                name: category
                            },
                        },
                        slug,
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
    if (req.method == 'GET') {
        const posts = await prisma.post.findMany({
            include: {
                category: true,
                author: true,
                comments: true
            },
            orderBy: {
                createAt: "desc"
            },
        });
        res.json(posts);
    } if (req.method === 'PUT') {
        const session = await getSession({ req });
        if (session) {
            try {
                const result = await prisma.post.update({
                    where: {
                        slug: slug
                    },
                    data: {
                        title,
                        content,
                        category: {
                            update: {
                                name: category
                            },
                        },
                        slug,
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
    } else {
        res.status(401).send({ message: 'Unauthorized' });
    }
}
