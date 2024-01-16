import Link from 'next/link';
export default function HomePageButtons({ userId }: { userId: string }) {
  return (
    <>
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
    </>
  );
}
