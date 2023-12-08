import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import PostList from '../../components/PostList'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { fetcherCategory, fetcherUser } from '../../lib/fetchhooks'
import Category from '../../components/Category'
import Head from 'next/head'


const DashbordDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, error, } = useSWR(`/api/user/${id}`, fetcherUser,)
    const { data: cat, error: err } = useSWR('/api/category', fetcherCategory)
    const categ = cat ? new Set(cat.map(c => c.name)) : []


    const categories = [...categ]


    const posts = data ? data.posts : []
    const [filtered, setFiltered] = useState(posts)



    const filteredData = (cat) => {
        const filterData = posts && posts.filter(post => post.category.name == cat)
        setFiltered(filterData)
    }

    useEffect(() => {
        setFiltered(posts)
    }, [posts])

    if (error) return "eroor happened ...."
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
                <title>dahbord | {id}</title>
            </Head>
            <div className="flex flex-wrap gap-2">
                <button onClick={() => setFiltered(posts)} className='px-4 border-r-2 rounded-md uppercase font-semibold hover:bg-teal-800 active:bg-teal-800 transition-all duration-300 py-2 text-gray-100 bg-teal-500'>all</button>
                {categories.map(cat => {
                    return <button onClick={() => filteredData(cat)} className='px-4 border-r-2 rounded-md uppercase font-semibold hover:bg-teal-800 active:bg-teal-800 transition-all duration-300 py-2 text-gray-100 bg-teal-500'>{cat}</button>
                })}
            </div>
            <div >
                {filtered.length > 0 ? <PostList posts={filtered} title="all posts" /> : <div className="mt-10 ">
                    <h1 className='text-xl font-bold uppercase text-center text-red-500'>nothing for this category ...sorrryyyy!</h1>
                </div>}
            </div>


        </div>
    )
}

export default DashbordDetail