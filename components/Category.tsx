import React from 'react'
import Link from 'next/link'

interface Props {
    categories: string[]
    isAll: boolean
}

const Category = ({ categories, isAll }: Props) => {
    return (
        <div className="flex flex-wrap  gap-2">
            {isAll && <Link href="/blog" className='px-4 border-r-2 rounded-md uppercase font-semibold hover:bg-teal-800 active:bg-teal-800 transition-all duration-300 py-2 text-gray-100 bg-teal-500'>all</Link>}
            {categories.map((cat, i) => {
                return <Link href={`/blog/${cat}`} key={i} className={'px-4 border-r-2 rounded-md uppercase font-semibold hover:bg-teal-800 active:bg-teal-800 transition-all duration-300 py-2 text-gray-100 bg-teal-500'}>
                    {cat}
                </Link>
            })}
        </div>
    )
}

export default Category