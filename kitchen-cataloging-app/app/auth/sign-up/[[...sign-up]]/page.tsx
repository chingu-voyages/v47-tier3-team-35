import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <SignUp
          redirectUrl={"/auth/new-user"}
          routing="path"
          path="/auth/sign-up"
          signInUrl="/auth/sign-in"
        />
      </div>
    </div>
  );
}
