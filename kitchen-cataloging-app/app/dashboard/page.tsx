import { UserButton, currentUser } from '@clerk/nextjs';
import Link from 'next/link';

export default async function Dashboard() {
  const user = await currentUser();

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 p-5'>
      <div className='absolute top-5 right-5 flex gap-2 items-center'>
        <UserButton showName={true} afterSignOutUrl='/sign-in' />
      </div>
      <h1 className='text-2xl text-gray-800 mb-5'>Welcome {user?.firstName}</h1>
      <p className='text-xl text-gray-600 mb-5'>Here are your items</p>
      <Link href='/dashboard/rooms'>My Spaces</Link>
    </div>
  );
}
