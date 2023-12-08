
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.bubble.css';
import axios from 'axios'
import useSWR, { mutate } from 'swr';
import Profile from '../../components/Profile'
import Comm from '../../components/Comm'
import RelatedPost from '../../components/RelatedPost'
import Update from '../../components/Update'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { fetcher, fetcherPost } from '../../lib/fetchhooks'
import Head from 'next/head';


const BlogDetail = () => {
    const router = useRouter()

    const { slug } = router.query
    const { data: session, status } = useSession();

    const { data, error, } = useSWR(`/api/post/${slug}`, fetcherPost, {
        revalidateOnFocus: false,
    })
    const { data: posts, error: err, } = useSWR(`/api/post`, fetcher, {
        revalidateOnFocus: false,
    })
    // const { mutate } = useSWRConfig()
    const [message, setMessage] = useState("")
    const [showModal, setShowModal] = useState(false);

    const userHasValidSession = Boolean(session);
    const postBelongsToUser = data ? session?.user?.email === data.author?.email : null;


    const deletePost = async (slug: string) => {
        const res = await axios.delete(`http://localhost:3000/api/post/${slug}`).then(() => {
            router.push("/")
        })
    }

    const deleteComment = async (id: number) => {
        const res = await axios.delete(`http://localhost:3000/api/comment/${id}`).then(() => {
            console.log(`comment deleted`);
            mutate(`/api/post/${slug}`)
        })
    }

    const UpdateComment = async (e) => {
        e.preventDefault();
        if (!message && !session) {
            return;
        }
        else {

            const res = await axios.post("http://localhost:3000/api/comment", {
                id: data.id,
                message,
            })
            if (res.status == 200) {
                console.log("comment created successfully");
                setMessage("")
                mutate(`/api/post/${slug}`)
            } else {
                console.log('somethings went wrong');
            }
        }
    }
    if (!data) {
        return <div className="flex flex-col justify-center items-center w-full min-h-screen">
            <AiOutlineLoading3Quarters size={50} className="animate-spin text-teal-500" />
        </div>;
    }
    if (status == "loading") {
        return <div className="flex flex-col justify-center items-center w-full min-h-screen">
            <AiOutlineLoading3Quarters size={50} className="animate-spin text-teal-500" />
        </div>;
    }
    const relativePosts = posts ? posts.filter(p => p.category.name == data.category.name) : []

    const relPosts = relativePosts.filter(post => post.slug !== slug)

    return (
        <>
            <Head>
                <title>mustak blog | {data.title}</title>
            </Head>
            <div>
                <div className='max-w-7xl mx-auto px-6 xl:px-0 '>
                    <div className="w-full h-[420px]  shadow-teal-500 shadow-md ">
                        <Image src={data.imageUrl} width={1200} height={350} alt={data.title} className="w-full h-full object-cover object-center" />
                    </div>
                    <div className='grid w-full lg:grid-cols-12 gap-10'>
                        <div className="lg:col-span-7 px-6 py-2 ">
                            <div className="mt-6 w-full flex flex-col prose space-y-10">
                                <h1 className="text-center text-2xl uppercase font-extrabold  mb-2 border-red-600">{data.title} </h1>
                                <ReactQuill theme='bubble' value={data.content} readOnly />
                                <Profile image={data?.imageUrl} id={data.author?.id} author={data.author?.name} />

                            </div>
                            <div className='flex space-x-4'>
                                <button onClick={() => router.back()} className='px-4 mt-10 py-2 bg-gray-800 hover:bg-gray-700 duration-200 transition text-gray-100 uppercase font-semibold rounded-md'>go back</button>
                                {postBelongsToUser && userHasValidSession && <button onClick={() => deletePost(data.slug)} className='px-4 mt-10 py-2 bg-red-500 hover:bg-red-700 duration-200 transition text-gray-100 uppercase font-semibold rounded-md'>delete</button>}
                                {postBelongsToUser && userHasValidSession && <button onClick={() => setShowModal(true)} className='px-4 mt-10 py-2 bg-green-500 hover:bg-green-700 duration-200 transition text-gray-100 uppercase font-semibold rounded-md'>update</button>}
                            </div>
                        </div>
                        <div className='w-full lg:col-span-5 bg-gray-300 p-2 rounded-xl shadow shadow-teal-500 flex flex-col  gap-4 my-20   min-h-[200] lg:px-0'>
                            {relPosts.length > 0 ? (relPosts.slice(0, 4).map(post => {
                                return <RelatedPost post={post} />
                            })) : (<div>
                                <h1 className='text-xl font-bold uppercase text-center text-red-500'>does not have relative posts ! </h1>
                            </div>)
                            }
                        </div>
                    </div>

                    {/* comment section */}
                    <div className="my-6">
                        <h3 className='mb-3  text-lg   font-bold text-teal-500 uppercase'>comment this posts</h3>
                        <p className='mb-4 capitalize text-md text-gray-700'> this post have {data.comments.length} comment(s)</p>
                        <form onSubmit={UpdateComment} className='flex space-x-2 items-center'>
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="py-2 outline-none px-3 bg-gray-200 w-full rounded-md " placeholder='comment ......' />
                            <button disabled={!session} type='submit' className='px-4 py-2 bg-gray-800 hover:bg-gray-700 duration-200 transition text-gray-100 uppercase font-semibold rounded-md'>comment</button>
                        </form>
                        {/* {error && <p className='text-red-500'>{error}</p>} */}
                    </div>
                    {data.comments.length > 0 ?

                        <div className='my-6 space-y-3 bg-gray-300 border rounded-md p-2 shadow-sm shadow-teal-500 '>
                            {
                                data.comments.map((comment, i) => {
                                    return (<Comm key={i} session={session} comment={comment} deleteComment={deleteComment} />)
                                })
                            }
                        </div> : <div></div>
                    }
                </div>

                {/* update model */}
                {showModal &&
                    <div className="h-screen fixed overflow-y-scroll top-0 left-0 w-full  bg-black/50">
                        <div className='max-w-xl mx-auto'>
                            <Update setShowModel={setShowModal} postup={data} mutate={mutate} />
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default BlogDetail
