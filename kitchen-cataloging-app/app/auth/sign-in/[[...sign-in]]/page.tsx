import { SignIn } from "@clerk/nextjs";
import { headers } from "next/headers";
export default function Page({
  searchParams,
}: {
  searchParams: {
    slug: string;
    redirect_url: string;
  };
}) {
  const headersList = headers();
  const domainName = headersList.get("host") as string;
  const redirectUrl = searchParams.redirect_url
    ?.replace(domainName, "")
    ?.replace("https://", "")
    ?.replace("http://", "");
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <SignIn
        path="/auth/sign-in"
        routing="path"
        signUpUrl="/auth/sign-up"
        afterSignInUrl={redirectUrl}
      />
    </div>
  );
}
