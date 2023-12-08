import React from 'react'
import { MdDelete } from 'react-icons/md'
import Profile from './Profile'

const Comm = ({ comment, session, deleteComment }) => {
    return (
        <div className="flex flex-col gap-4">
            <Profile image={comment.user?.image} author={comment.user?.name} id={comment.user?.id} />
            <div className='bg-gray-100 flex items-center justify-between ml-5 p-2 rounded-md'>
                <p className='ml-10 text-md flex-1 '>{comment.message}</p>
                {session?.user?.email == comment.user?.email && (<div onClick={() => deleteComment(comment.id)}>
                    <MdDelete size={25} color="red" className='cursor-pointer' />
                </div>)}

            </div>
        </div>
    )
}

export default Comm