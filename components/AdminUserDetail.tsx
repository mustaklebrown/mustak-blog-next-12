import { User } from '@prisma/client'
import React from 'react'
import Image from 'next/image'

interface Props {
    user: User
}

const AdminUserDetail = ({ user }: Props) => {
    return (
        <li className="p-3 border-2 rounded-md shadow shadow-teal-400 hover:-translate-y-1 duration-200 transition-all sm:pb-4 w-ful">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <Image className="w-8 h-8 rounded-full" src={user.image} width={100} height={100} alt={user.image} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {user.admin && <p>Admin</p>}
                </div>
            </div>
        </li>
    )
}

export default AdminUserDetail