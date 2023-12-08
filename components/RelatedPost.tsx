import { Post, User } from '@prisma/client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
interface Blog extends Post {
    category: {
        id: number,
        name: string
    }
    author: User
}

interface Props {
    post: Blog
}



const RelatedPost = ({ post }: Props) => {
    return (
        <div className='bg-white p-1 flex space-x-2 shadow-md shadow-teal-500'>
            <div className="md:w-[30%] w-[50%]">
                <Link href={`/post/${post.slug}`} className="cursor-pointer w-full ">
                    <Image src={post.imageUrl} width={200} height={150} alt={post.title} className="rounded-md w-full h-full object-cover " />
                </Link>
            </div>
            <div className=" space-y-1 lg:space-y-3">
                <h1 className="text-md text-teal-500 font-bold uppercase">{post.title}</h1>
                <p className="text-gray-600 text-sm">{post.excerpt.slice(0, 50)}</p>
                <p>{post.author.name}</p>
            </div>
        </div>
    )
}

export default RelatedPost