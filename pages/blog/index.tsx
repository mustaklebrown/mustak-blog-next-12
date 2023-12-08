
import React from 'react'
import PostList from '../../components/PostList'
import useSWR from 'swr'
import { useRouter } from 'next/router';
import { Blog } from '../../lib/types'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { fetcher, fetcherCategory } from '../../lib/fetchhooks'
import Category from '../../components/Category'
import Head from 'next/head';



const blog = () => {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname;

    const { data, error } = useSWR('/api/post', fetcher)
    const { data: category, error: err } = useSWR('/api/category', fetcherCategory)

    const categ = category ? new Set(category.map(c => c.name)) : []

    const categories = [...categ]

    if (error) {
        return <div>{error}</div>
    }
    return (
        <>
            <Head>
                <title>Mustak Blog | blog</title>
            </Head>
            <div className='max-w-7xl mx-auto  min-h-screen px-5 lg:px-0' >
                <div className='flex'>
                    <Category categories={categories} isAll />
                </div>
                <div >
                    {data ? <PostList posts={data} title="all posts" /> : (<div className="flex flex-col justify-center items-center w-full min-h-screen">
                        <AiOutlineLoading3Quarters size={50} className="animate-spin text-teal-500" />
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default blog
