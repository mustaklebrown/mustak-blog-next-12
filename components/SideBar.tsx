import React, { useEffect } from 'react'
import Link from 'next/link'
import { AiOutlineComment } from 'react-icons/ai'
import { BiMessageAltDetail, BiAddToQueue } from 'react-icons/bi'
import Profile from './Profile'


const dashbord = [
    {
        id: 1,
        link: "posts",
        icon: <AiOutlineComment size={25} />
    },
    {
        id: 2,
        link: "comments",
        icon: <AiOutlineComment size={25} />
    }
]


interface Props {
    setIscomments: React.Dispatch<React.SetStateAction<boolean>>
    setIsposts: React.Dispatch<React.SetStateAction<boolean>>
    iscomments: boolean,
    isposts: boolean,
    author: string,
    image: string
}

const SideBar = ({ setIscomments, setIsposts, image, author, isposts, iscomments }) => {

    const comments = () => {
        setIscomments(true);
        setIsposts(false);
        console.log("iscomments", iscomments)
    }
    const posts = () => {
        setIscomments(false);
        setIsposts(true);
        console.log("ıisposts", isposts)
    }

    useEffect(() => {
        comments()
    }, [iscomments])
    useEffect(() => {
        posts()
    }, [isposts])

    return (
        <div className='w-full h-screen text-gray-100 pt-10 px-4'>
            <Profile image={image} author={author} />
            <div className="mt-8 space-y-4 ml-2 flex flex-col items-center lg:items-start justify-center">
                <div className="flex items-center cursor-pointer p-3 rounded-md gap-3 hover:bg-black/40 transition-all duration-200">
                    <span className="inline-block">
                        <BiMessageAltDetail size={25} />
                    </span>
                    <span className="hidden lg:block font-bold uppercase text-base text-teal-500">
                        posts
                    </span>
                </div>
                <Link href="/create" className="flex items-center cursor-pointer p-3 rounded-md gap-3 hover:bg-black/40 transition-all duration-200">
                    <span className="inline-block">
                        <BiAddToQueue size={25} />
                    </span>
                    <span className="hidden lg:block font-bold uppercase text-base text-teal-500">
                        create post
                    </span>
                </Link>

            </div>
        </div>
    )
}

export default SideBar