import Hero from '../components/Hero';
import PostList from '../components/PostList';
import useSWR from 'swr'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import bgHero from '../public/newyork.jpg'
import { fetcher, fetcherCategory } from '../lib/fetchhooks';
import Category from '../components/Category';
import Head from 'next/head';



export default function Home() {
  const { data, error } = useSWR('/api/post', fetcher)
  const { data: cat, error: err } = useSWR('/api/category', fetcherCategory)
  const categ = cat ? new Set(cat.map(c => c.name)) : []

  const categories: string[] = [...categ]

  const posts = data ? data.slice(0, 6) : []
  if (error) {
    return <div>{error}</div>
  }
  if (!posts) {
    return <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <AiOutlineLoading3Quarters size={50} className="animate-spin text-teal-500" />
    </div>;
  }

  return (
    <>
      <Head>
        <title>Mustak Blog </title>
      </Head>
      <div className='max-w-7xl mx-auto  min-h-screen px-5 lg:px-0'>
        <Hero title="welcome to our blog and explore " image={bgHero} />
        <div className="flex items-center justify-center w-full my-10">
          <div className="flex">
            <Category categories={categories} isAll />
          </div>
        </div>
        {posts && <PostList posts={posts} title="new posts" />}
      </div>
    </>
  )
}

