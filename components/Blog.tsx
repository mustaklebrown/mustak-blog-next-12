import { Comment, Post, User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Blog } from '../lib/types'
import Profile from './Profile'



interface Props {
    post: Blog
}
// const Blog = ({ post }: Props) => {
//     return (
//         <div className=' max-w-sm overflow-hidden  relative rounded-md hover:-translate-y-1 duration-200 transition-all  shadow-sm shadow-teal-400 h-auto '>
//             <Link href={`/post/${post.slug}`} className="cursor-pointer ">
//                 <Image src={post.imageUrl} alt='blog image' width={200} height={200} className="block w-full h-52 object-cover" />
//             </Link>


//             <div className='p-3 flex flex-col gap-2'>
//                 <div className='flex gap-3 items-center'>
//                     <Link href={`/blog/${post.category.name}`}>
//                         <h1 className='p-1 font-bold capitalize border rounded-xl shadow-sm shadow-red-200 text-red-500' > {post.category.name} </h1>
//                     </Link>
//                 </div>
//                 <Link href={`/post/${post.slug}`} className="cursor-pointer "><h1 className='text-xl font-bold uppercase truncate'>{post.title}</h1></Link>

//                 <div className='flex gap-2 items-center justify-between'>
//                     <Profile author={post.author.name} image={post.author.image} id={post.author?.id} />
//                     <p>{new Date(post.createAt).toLocaleDateString("en-US", {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                     })}</p>
//                 </div>
//                 <p className='text-gray-600 font-mono'>{post.excerpt.slice(0, 50)}</p>
//                 <p className="text-md text-gray-800 font-bold capitalize">comments : {post.comments.length}</p>
//             </div>
//         </div>
//     )
// }

// export default Blog




const Blog = ({ post }: Props) => {
    return (
        <div className="overflow-hidden transition-shadow duration-300 shadow-sm shadow-teal-400 relative hover:-translate-y-1bg-white rounded">
            <Link href={`/post/${post.slug}`} aria-label="Article">
                {/* <Image
                    src={post.imageUrl}
                    className="object-cover w-full h-64 rounded"
                    alt={post.title}
                    width={400}
                    height={256}
                /> */}
                <Image src={post.imageUrl} alt='blog image' width={200} height={200} className="block w-full h-64 rounded object-cover" />
            </Link>
            <div className="py-5 px-4">
                <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                    {new Date(post.createAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>
                <Link
                    href={`/post/${post.slug}`}
                    aria-label="Article"
                    className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                    <p className="text-2xl capitalize font-bold leading-5">{post.title}</p>
                </Link>
                <p className="mb-4 text-gray-700">
                    {post.excerpt.slice(0, 100)}
                </p>
                <div className="flex space-x-4">
                    <a
                        href="/"
                        aria-label="Likes"
                        className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
                    >
                        <div className="mr-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700"
                            >
                                <polyline
                                    points="6 23 1 23 1 12 6 12"
                                    fill="none"
                                    strokeMiterlimit="10"
                                />
                                <path
                                    d="M6,12,9,1H9a3,3,0,0,1,3,3v6h7.5a3,3,0,0,1,2.965,3.456l-1.077,7A3,3,0,0,1,18.426,23H6Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeMiterlimit="10"
                                />
                            </svg>
                        </div>
                        <p className="font-semibold">7.4K</p>
                    </a>
                    <a
                        href="/"
                        aria-label="Comments"
                        className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
                    >
                        <div className="mr-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700"
                            >
                                <polyline
                                    points="23 5 23 18 19 18 19 22 13 18 12 18"
                                    fill="none"
                                    strokeMiterlimit="10"
                                />
                                <polygon
                                    points="19 2 1 2 1 14 5 14 5 19 12 14 19 14 19 2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeMiterlimit="10"
                                />
                            </svg>
                        </div>
                        <p className="font-semibold">
                            {post.comments.length}
                        </p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Blog