import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios';
import React, { useState } from 'react'
import bg from '../public/france.jpg'


interface Props {
    title: string
    image: StaticImageData
}

const fetcher = url => axios.get(url).then(res => res.data)

const Hero = ({ title, image }: Props) => {
    const { data, error } = useSWR('/api/category', fetcher)


    const categ = data ? new Set(data.map(c => c.name)) : []

    return (
        <div className='w-full h-[500px] '>
            <div className='w-full md:h-full h-[400px]  relative rounded-md overflow-hidden'>
                <div className='w-full h-full bg-black/60 absolute
                 top-0 left-0 z-30 flex space-x-6 items-center justify-center'>
                    <div className="max-w-lg mx-auto text-center space-y-6 ">

                        <h1 className="text-2xl md:text-3xl uppercase font-bold text-teal-500">{title}</h1>
                        <p className="text-gray-200 text-lg max-w-md mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit illo architecto non inventore molestiae est quas voluptas officia iste adipisci.</p>
                    </div>

                </div>
                <Image src={image} alt='image hero' width={1000} height={500} className='w-full h-full object-cover object-center' />

            </div>

        </div>
    )
}

export default Hero