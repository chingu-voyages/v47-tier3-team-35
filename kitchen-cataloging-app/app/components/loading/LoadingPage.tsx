export default function LoadingPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 p-5 gap-3'>
      <div className='animate-pulse bg-gray-400 h-4 w-24 rounded'></div>
      <div className='animate-pulse bg-gray-400 h-4 w-64 rounded'></div>
      <div className='animate-pulse bg-gray-400 h-4 w-64 rounded'></div>
      <div className='absolute top-5 right-5 flex gap-2 items-center'>
        <div className='animate-pulse bg-gray-400 h-6 w-24 rounded'></div>
      </div>
    </div>
  );
}