import { Comment, Post, User } from '@prisma/client'
import React from 'react'
import Blog from './Blog'

interface Posts extends Post {
    category: {
        name: string;
        id: number
    }
    author: User,
    comments: {
        message: string;
        user: User;
        id: number;
    }[];
}

interface Props {
    posts: Posts[]
    title: string
}

const PostList = ({ posts, title }: Props) => {
    return (
        <div className='mt-8'>
            <h1 className='text-xl font-bold text-teal-500 uppercase mb-10'>{title}</h1>
            <div className='w-full flex items-center flex-col space-y-4 md:space-y-0 px-4 xl:px-0 justify-start md:items-start  md:grid md:grid-cols-2 lg:grid-cols-3  md:gap-10'>
                {
                    posts.map((post) => {
                        return <Blog key={post.id} post={post} />
                    })
                }
            </div>
        </div>
    )
}

export default PostList