import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className='flex justify-between max-w-7xl mx-auto  px-5 lg:px-0'>
            <div className="flex flex-col space-y-4">
                <span className="font-bold uppercase text-teal-500">Services</span>
                <a className="text-md capitalize cursor-pointer  transition-all duration-200  hover:text-teal-500">Branding</a>
                <a className="text-md capitalize cursor-pointer  transition-all duration-200  hover:text-teal-500">Design</a>
                <a className="text-md capitalize cursor-pointer  transition-all duration-200  hover:text-teal-500">Marketing</a>
                <a className="text-md capitalize cursor-pointer  transition-all duration-200  hover:text-teal-500">Advertisement</a>
            </div>
            <div className="flex flex-col space-y-4">
                <span className="font-bold uppercase text-teal-500">Company</span>
                <Link href="/about" className="text-md capitalize cursor-pointer  transition-all duration-200  hover:text-teal-500">About us</Link>
                <a className="text-md capitalize cursor-pointer  transition-all duration-200  hover:text-teal-500">Contact</a>
                <a className="text-md capitalize cursor-pointer  transition-all duration-200  hover:text-teal-500">Jobs</a>
                <a className="text-md capitalize cursor-pointer  transition-all duration-200  hover:text-teal-500">Press kit</a>
            </div>
            <div className="flex flex-col space-y-4">
                <span className="font-bold uppercase text-teal-500">Legal</span>
                <a className="text-md capitalize cursor-pointer  transition-all duration-200  hover:text-teal-500">Terms of use</a>
                <a className="text-md capitalize cursor-pointer  transition-all duration-200  hover:text-teal-500">Privacy policy</a>
                <a className="text-md capitalize cursor-pointer  transition-all duration-200  hover:text-teal-500">Cookie policy</a>
            </div>
        </div>
    )
}

export default Footer