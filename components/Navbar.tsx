import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { useRouter } from 'next/router';
import { useSession, signOut, signIn } from 'next-auth/react';

const links = [
  {
    link: "home",
    href: "/"
  },
  {
    link: "about",
    href: "/about"
  },
  {
    link: "blog",
    href: "/blog"
  },
]


const Navbar = () => {

  const [openNav, setOpenNav] = useState(false)
  const [category, setCategory] = useState([])
  const router = useRouter();
  const { data: session } = useSession();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const open = () => {
    setOpenNav(prev => !prev)
  }

  // const fetchCategory = async () => {
  //   const categ = await fetch("http://localhost:3000/api/category")
  //     .then((response) => response.json())

  //   setCategory(categ)
  // }
  // useEffect(() => {
  //   fetchCategory()
  // }, [])
  return <div className='w-full  mb-5 bg-gray-800 py-4 text-white fixed top-0 left-0 z-50'>
    <div className='max-w-7xl mx-auto flex px-4 lg:px-0 justify-between relative'>
      <div>
        <Link href="/" className=' cursor-pointer first-letter:text-2xl first-letter:text-rose-600 first-letter:italic text-teal-500 text-xl uppercase font-bold'>mustak <span className="text-red-500">blog</span></Link>
      </div>
      <nav className='hidden md:block'>
        <ul className='flex space-x-6 items-center'>
          {links.map((link, i) => {
            return <Link className={!isActive(link.href) ? 'text-md uppercase hover:text-teal-500 duration-300 transition-colors' : 'text-teal-500 text-md uppercase'} key={i} href={link.href}>{link.link}</Link>
          })}
          {session && <Link className={!isActive("/create") ? 'text-md uppercase hover:text-teal-500 duration-300 transition-colors' : 'text-teal-500 text-md uppercase'} href="/create">create</Link>}
          {session && <Link className={!isActive("/dashbord") ? 'text-md uppercase hover:text-teal-500 duration-300 transition-colors' : 'text-teal-500 text-md uppercase'} href="/dashbord">dashbord</Link>}
          {!session ? (<button className="text-md uppercase hover:bg-teal-600 active:bg-teal-600 bg-teal-500 duration-300 transition-colors py-1 px-4 rounded-md" onClick={() => signIn()} >
            <a className="btn" >Log in</a>
          </button>) : (<button className="text-md uppercase hover:bg-teal-600 active:bg-teal-600 bg-teal-500 duration-300 transition-colors py-1 px-4 rounded-md" onClick={() => signOut()}>
            <a>Log out</a>
          </button>)}
        </ul>
      </nav>
      <div onClick={open} className='md:hidden hover:text-teal-500 duration-300 transition-all hover:-translate-y-1'>
        <FaBars size={25} />
      </div>
      {/* mobile navigation */}
      <div className={openNav ? ` w-[60%] p-3 bg-gray-800 duration-300 transition-all  md:hidden h-screen absolute top-0 right-0` : "hidden"}>
        <div onClick={open} className='md:hidden inline-block hover:text-teal-500 duration-300 transition-all hover:-translate-y-1'>
          <AiOutlineClose size={25} />
        </div>
        <div className='w-full h-full'>
          <ul className='flex flex-col justify-center
           items-center h-full space-y-4
           '>
            {links.map((link, i) => {
              return <Link onClick={open} className={isActive(link.href) ? 'text-md uppercase text-teal-500 ' : 'text-md uppercase hover:text-teal-500 duration-300 transition-colors'} key={i} href={link.href}>{link.link}</Link>
            })}
            {session && <Link onClick={open} className={isActive("/create") ? 'text-md uppercase text-teal-500 ' : 'text-md uppercase hover:text-teal-500 duration-300 transition-colors'} href={"/create"}>create</Link>}
            {session && <Link onClick={open} className={isActive("/dashbord") ? 'text-md uppercase text-teal-500 ' : 'text-md uppercase hover:text-teal-500 duration-300 transition-colors'} href={"/dashbord"}>dashbord</Link>}
            {!session ? (<button className="text-md uppercase hover:bg-teal-600 active:bg-teal-600 bg-teal-500 duration-300 transition-colors py-1 px-4 rounded-md" onClick={() => signIn()} >
              <a className="btn" >Log in</a>
            </button>) : (<button className="text-md uppercase  hover:bg-teal-600 active:bg-teal-600 bg-teal-500 duration-300 transition-colors py-1 px-4 rounded-md" onClick={() => signOut()}>
              <a>Log out</a>
            </button>)}
          </ul>
        </div>
      </div>
    </div>
  </div>;
};

export default Navbar;
