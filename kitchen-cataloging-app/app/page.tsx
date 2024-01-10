import { UserButton, SignInButton, currentUser } from '@clerk/nextjs';

export default async function Home() {
  const user = await currentUser();

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 p-5'>
      <h1 className='text-2xl text-gray-800 mb-5'>Home Page</h1>
      {user ? <UserButton /> : <SignInButton />}
    </div>
  );
}
