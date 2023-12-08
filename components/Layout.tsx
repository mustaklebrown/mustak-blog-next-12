import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface Props {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <div className=''>
      <Navbar />
      <main className='mt-20'>{children}</main>
      <footer className=" bg-gray-800 p-4 mt-10 text-gray-100">
       <Footer />
      </footer>
    </div>
  );
};

export default Layout;
