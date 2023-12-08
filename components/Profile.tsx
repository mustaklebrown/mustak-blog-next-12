import React from 'react'
import Link from 'next/link'

interface Props {
    image: string
    author: string,
    id: number
}

const Profile = ({ image, author, id }) => {
    return (
        <div className='flex gap-2 items-center'>

            <div className="flex gap-1 items-center w-10 h-10 rounded-full">
                <img src={image} alt="profile image " className="w-full h-full object-cover rounded-full" />
            </div>
            <Link href={`/dashbord/${id}`}>

                <p className='text-sm font-semibold text-teal-500 capitalize font=serif'>{author.slice(0, 15)}</p>
            </Link>
        </div>
    )
}

export default Profile