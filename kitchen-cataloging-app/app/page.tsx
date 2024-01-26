import { auth } from '@clerk/nextjs';
import HomePageButtons from './components/HomePageButtons';
export default async function Home() {
  //check to see if the user has been autheticated
  const { userId } = auth();
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 p-5'>
      <h1 className='text-2xl text-gray-800 mb-5'>Kitchen Cataloging App</h1>
      <p className='text-xl text-gray-600 mb-5'>
        Please sign in to manage your kitchen items
      </p>
      <div className='flex gap-4'>
        <HomePageButtons userId={userId || ''} />
      </div>
    </div>
  );
}
