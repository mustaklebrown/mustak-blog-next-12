import React from 'react'
import PostList from '../../components/PostList'
import axios from 'axios'
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Blog } from '../../lib/types'
import { Category } from '@prisma/client'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { fetcher, fetcherCategory } from '../../lib/fetchhooks';
import Head from 'next/head';


const FilterPage = () => {
    const router = useRouter()
    const { category } = router.query
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname;
    const { data, error } = useSWR(`/api/post/`, fetcher)
    const posts = data?.filter(post => post.category.name == category)

    const { data: cat, error: err } = useSWR('/api/category', fetcherCategory)
    const categ = cat ? new Set(cat.map(c => c.name)) : []



    if (error) return "error happened during fetching data"

    if (posts?.length < 1) {
        return (
            <div className="max-w-7xl mx-auto px-4 lg:px-0">
                <div className='flex flex-wrap items-center gap-2'>
                    <Link href={`/blog`} className={'px-4 border-r-2 rounded-md uppercase font-semibold hover:bg-teal-800 active:bg-teal-800 transition-all duration-300 py-2 text-gray-100 bg-teal-500'}>all</Link>
                    {[...categ].map((cat, i) => {
                        return <Link href={`/blog/${cat}`} key={i} className={'px-4 border-r-2 rounded-md uppercase font-semibold hover:bg-teal-800 active:bg-teal-800 transition-all duration-300 py-2 text-gray-100 bg-teal-500'}>{cat}</Link>
                    })}
                </div>
                <div className='w-full min-h-screen flex flex-col items-center justify-center'>
                    <h1 className='text-2xl text-red-400 font-bold capitalize'>no blog for  {category} </h1>
                </div>
            </div>)
    }
    return (
        <>
            <Head>
                <title>mustak blog | {category}</title>
            </Head>
            <div>
                <div className='max-w-7xl mx-auto mt-10 px-6 xl:p-0 '>
                    <div className='flex items-center gap-2 flex-wrap'>
                        <Link href={`/blog`} className={'px-4 border-r-2 rounded-md uppercase font-semibold hover:bg-teal-800 active:bg-teal-800 transition-all duration-300 py-2 text-gray-100 bg-teal-500'}>all</Link>
                        {[...categ].map((cat, i) => {
                            return <Link href={`/blog/${cat}`} key={i} className={'px-4 border-r-2 rounded-md uppercase font-semibold hover:bg-teal-800 active:bg-teal-800 transition-all duration-300 py-2 text-gray-100 bg-teal-500'}>{cat}</Link>
                        })}
                    </div>
                    <div className=" w-full ">
                        {posts ? <PostList posts={posts} title={`posts related for ${category}`} /> : (<div className="flex flex-col justify-center items-center w-full min-h-screen">
                            <AiOutlineLoading3Quarters size={50} className="animate-spin text-teal-500" />
                        </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterPage

// export const getServerSideProps: GetServerSideProps = async (context) => {

//     const categ = context.params

//     const category = encode(categ)
//     const searchParams = new URLSearchParams(category)
//     const data = await axios.get(`http://localhost:3000/api/post`)

//     const posts = JSON.parse(JSON.stringify(data.data))


//     const fiter = posts.filter(post => post.category.name == categ.category)

//     console.log(fiter)
//     return {
//         props: {
//             posts: fiter
//         }
//     }
// }