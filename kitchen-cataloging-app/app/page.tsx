import { UserButton, SignInButton, currentUser } from '@clerk/nextjs';

export default async function Home() {
  const user = await currentUser();

  return (
    <div className='h-screen'>
      <h1>Home Page</h1>
      {user ? <UserButton /> : <SignInButton />}
    </div>
  );
}
