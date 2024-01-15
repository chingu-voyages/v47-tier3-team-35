import { redirect } from 'next/navigation';
// import { prisma } from '../../../lib/prisma';
import { currentUser } from '@clerk/nextjs';

const { PrismaClient } = require('@prisma/client');

const { config } = require('dotenv');
config({ path: '.env.local' });

const prisma = new PrismaClient({});

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
        firstName: user?.firstName, //Use the first name from the Clerk user
        lastName: user?.lastName, ///Use the last name from the Clerk user
      },
    });
  }

  redirect('/dashboard');
};

// The main component
const NewUser = async () => {
  // Create the new user
  await createNewUser();

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 p-5'>
      Loading...
    </div>
  );
};

export default NewUser;
