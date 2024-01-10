import { UserButton, currentUser } from '@clerk/nextjs';
import Link from 'next/link';
export default async function Home() {
  const user = await currentUser();

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 p-5'>
      <h1 className='text-2xl text-gray-800 mb-5'>Kitchen Cataloging App</h1>
      <p className='text-xl text-gray-600 mb-5'>
        Please sign in to manage your kitchen items
      </p>
      <div className='flex gap-4'>
        <Link
          href='/sign-in'
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Sign In
        </Link>
        <Link
          href='/sign-up'
          className='px-4 py-2 bg-green-500 text-white rounded'
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
