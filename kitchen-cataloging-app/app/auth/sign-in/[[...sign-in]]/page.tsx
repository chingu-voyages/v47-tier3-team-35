import { SignIn } from '@clerk/nextjs';
export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <SignIn path="/auth/sign-in" signUpUrl='/auth/sign-up'/>
      </div>
    </div>
  );
}
