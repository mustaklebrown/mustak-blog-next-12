
import AdminUserDetail from '../components/AdminUserDetail'
import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import useSWR from 'swr'
import Hero from '../components/Hero'
import Link from 'next/link'
import Head from 'next/head'
import aboutImage from '../public/france.jpg'
import { fetcherUserAdmin } from '../lib/fetchhooks'


const about = () => {

    const { data, error } = useSWR('/api/users', fetcherUserAdmin)

    const AdminUser = data && data.filter(user => user.admin == true)

    if (error) return "error happened ....."
    return (
        <div className='max-w-7xl mx-auto  min-h-screen px-5 lg:px-0'>
            <Head>
                <title>Mustak Blog | About</title>
            </Head>
            <Hero title="About us" image={aboutImage} />
            {data ?

                (<div className='flex flex-col md:flex-row  h-auto my-20 space-y-4 md:space-y-0 md:justify-around'>
                    <div className="w-full md:w-[45%] h-full">
                        <h2 className="text-xl font-bold text-teal-500 uppercase mb-10">our team</h2>
                        <ul className="w-full max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                            {AdminUser &&
                                AdminUser.map(user => <AdminUserDetail user={user} />)
                            }
                        </ul>
                    </div>
                    <div className="w-full md:w-[45%]  h-full ">
                        <h2 className="text-xl font-bold text-teal-500 uppercase mb-10">abou us  </h2>
                        <p className='text-base font-serif text-gray-500 tracking-wider my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quod delectus error ipsa ad vel! Voluptate obcaecati fuga modi quas, impedit non neque dolorem facilis?</p>
                        <p className='text-base font-serif text-gray-500 tracking-wider my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quod delectus error ipsa ad vel! Voluptate obcaecati fuga modi quas, impedit non neque dolorem facilis?</p>
                        <p className='text-base font-serif text-gray-500 tracking-wider my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quod delectus error ipsa ad vel! Voluptate obcaecati fuga modi quas, impedit non neque dolorem facilis?</p>
                    </div>
                </div>) : (<div className="flex flex-col py-20 justify-center items-center w-full h-full">
                    <AiOutlineLoading3Quarters size={50} className="animate-spin text-teal-500" />
                </div>)
            }
            <div className=" w-full text-center">
                <Link href="/blog" className="px-3 py-2 bg-teal-500 text-gray-100 uppercase text-lg font-bold text-center w-full">explore</Link>
            </div>


        </div>
    )
}

export default about