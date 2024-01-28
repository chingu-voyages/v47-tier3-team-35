import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import prisma from "../../prisma/client";
import LoadingPage from "@/components/utils/LoadingPage";

// Function to create a new user
const createNewUser = async () => {
  // Get the current user
  const user = await currentUser();

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
  createNewUser()
    //redirect according to status
    .then(() => {
      redirect("/dashboard");
    })
    .catch((err) => {
      console.error(err);
      redirect("/sign-up");
    });
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <LoadingPage />
    </div>
  );
};

export default NewUser;
