import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import PostList from '../../components/PostList'
import Category from '../../components/Category'
import { getSession, useSession } from 'next-auth/react';
import { fetcherCategory, fetcherUser } from '../../lib/fetchhooks'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Head from 'next/head';


const Dashbord = ({ session }) => {

    const router = useRouter()
    const { data, error, } = useSWR(`/api/user`, fetcherUser)
    const { data: cat, error: err } = useSWR('/api/category', fetcherCategory)
    const categ = cat ? new Set(cat.map(c => c.name)) : []

    const categories: string[] = [...categ]

    // const { data: session, status } = useSession()

    const posts = data && data.posts

    const [filtered, setFiltered] = useState(posts)

    const filteredData = (cat) => {
        const filterData = posts && posts.filter(post => post.category.name == cat)
        setFiltered(filterData)
    }

    const isAdmin = data && data.admin


    useEffect(() => {
        setFiltered(posts)
    }, [posts])

    if (error) return "error happened ...."
    if (!data) {
        return (
            <div className="flex flex-col justify-center items-center w-full min-h-screen">
                <AiOutlineLoading3Quarters size={50} className="animate-spin text-teal-500" />
            </div>
        )
    }

    return (
        <div className='max-w-7xl mx-auto  min-h-screen px-5 lg:px-0'>
            <Head>
                <title>dahbord</title>
            </Head>
            <div className="flex flex-wrap gap-2">
                <button onClick={() => setFiltered(posts)} className='px-4 border-r-2 rounded-md uppercase font-semibold hover:bg-teal-800 active:bg-teal-800 transition-all duration-300 py-2 text-gray-100 bg-teal-500'>all</button>
                {categories.map(cat => {
                    return <button onClick={() => filteredData(cat)} className='px-4 border-r-2 rounded-md uppercase font-semibold hover:bg-teal-800 active:bg-teal-800 transition-all duration-300 py-2 text-gray-100 bg-teal-500'>{cat}</button>
                })}
            </div>
            <div >
                {filtered?.length > 0 ? (<PostList posts={filtered} title="all posts" />) : <div className="mt-10 ">
                    <h1 className='text-xl font-bold uppercase text-center text-red-500'>nothing for this category ...sorrryyyy!</h1>
                </div>}
            </div>


        </div>
    )
}

export default Dashbord


export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { session }
    }
}