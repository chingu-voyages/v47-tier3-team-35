import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <SignUp
        redirectUrl={"/auth/new-user"}
        routing="path"
        path="/auth/sign-up"
        signInUrl="/auth/sign-in"
      />
    </div>
  );
}
