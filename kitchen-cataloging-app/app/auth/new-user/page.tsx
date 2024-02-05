import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/backend";
import prisma from "../../prisma/client";
import LoadingPage from "@/components/loading/LoadingPage";
// Function to create a new user
const createNewUser = async ({ user }: { user: User | null }) => {
  // Get the current user
  if (!user) return redirect("/auth/sign-up");
  // Try to find a user in the database with the same Clerk ID
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string, // Use the Clerk ID as the unique identifier
    },
  });

  // If no match is found, create a new user
  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string, // Use the Clerk ID as the unique identifier
        email: user?.emailAddresses[0].emailAddress as string, // Use the email from the Clerk user
        firstName: user?.firstName as string, //Use the first name from the Clerk user
        lastName: user?.lastName as string, ///Use the last name from the Clerk user
      },
    });
  }
};

// The main component
const NewUser = async () => {
  // Create the new user
  const user = await currentUser();
  createNewUser({ user })
    //redirect according to status
    .then(() => {
      redirect("/dashboard");
    })
    .catch((err) => {
      console.error(err);
      redirect("/auth/sign-up");
    });
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <LoadingPage />
    </div>
  );
};

export default NewUser;
