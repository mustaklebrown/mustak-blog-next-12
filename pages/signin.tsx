import React from 'react';
import Link from 'next/link'
import { signIn } from 'next-auth/react';


const LoginPage = () => {

  return (
    <div className="flex flex-col  items-center justify-center h-screen w-screen">
      <form className='max-w-md bg-gray-100 mx-auto w-full p-4 rounded-md shadow shadow-teal-500'>
        <div className='my-3 text-center w-full'>
          <h2 className='text-xl font-bold text-teal-500 uppercase '>LOGIN</h2>
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="you email please ..." required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" placeholder='your password...' id="password" className="border bg-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        <div className='my-4 flex flex-col items-center justify-center space-y-3'>
          <button
            className="py-2 px-4 w-full uppercase font-semibold text-gray-800 rounded-md bg-white shadow shadow-teal-500 hover:text-teal-500 duration-200 transition-colors"
            onClick={() =>
              signIn('google', {
                callbackUrl: 'http://localhost:3000',
              })
            }
          >
            google
          </button>
          <button
            className="py-2 px-4 w-full uppercase font-semibold text-white rounded-md bg-gray-700 shadow shadow-teal-500 hover:text-teal-500 duration-200 transition-colors "
            onClick={() =>
              signIn('github', {
                callbackUrl: 'http://localhost:3000',
              })
            }
          >
            github
          </button>
        </div>
        <p className='text-base font-semibold tracking-wider'>
          <span>do not have an account </span>
          <Link className='text-lg text-teal-500 underline' href="/signup">Sign UP</Link>
        </p>
      </form>

    </div>
  );
};

export default LoginPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// };
