import { redirect } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import { currentUser } from '@clerk/nextjs';

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
        email: user?.email as string, // Use the email from the Clerk user
        name: user?.name as string, // Use the name from the Clerk user
      },
    });
  }

  // Redirect the user to the dashboard
  redirect('/dashboard');
};

// The main component
const NewUser = async () => {
  // Create the new user
  await createNewUser();

  // Render a loading message while the user is being created
  return <div>...loading</div>;
};

export default NewUser;
