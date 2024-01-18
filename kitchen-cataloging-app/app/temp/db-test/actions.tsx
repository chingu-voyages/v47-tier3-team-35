"use server";

import prisma from "../../../prisma/client";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { seedData, UserType, ErrorType, PrismaUserResult } from "./data";

// Seed User
export async function seedUser(clerkId: string): Promise<UserType | ErrorType> {
    try {
      const seededUser = await prisma.user.update({
        where: {
          clerkId: clerkId,
        },
        data: {
          // Create rooms -- just need title. 'create' automatically populates userId and stores in rooms array in user model
          rooms: {
            create: seedData.rooms,
          },
          // Create foods. Associate to room just by the name of the room (Not stored in room model). Create Logs upon creating of food.
          foods: {
            create: seedData.foods.map((food) => ({
              ...food,
              log: {
                // Create a log entry for each food
                create: {
                  price: food.price,
                  amount: food.amount,
                  totalCost: food.price * food.amount,
                  timestamp: new Date(Date.now()),
                },
              },
            })),
          },
        },
        include: {
          rooms: true,
          foods: {
            include: {
              log: true,
            },
          },
        },
      });
const userResult: UserType = {
  id: seededUser.id,
  firstName: seededUser.firstName,
  lastName: seededUser.lastName,
  email: seededUser.email,
  clerkId: seededUser.clerkId,
  createdAt: seededUser.createdAt,
  updatedAt: seededUser.updatedAt,
  foods: seededUser.foods,
  rooms: seededUser.rooms,
};
  return userResult;
    } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
    // Handle Prisma-specific errors
    return { error: { status: err.code, message: err.message } };
    }
    // Other errors
    return { error: { status: "500", message: "Internal server error" } };
  }
    
}


// Fetch Current User Data
export async function fetchData(userId: string): Promise<UserType | ErrorType> {
  try {
    const getData = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      // Populate rooms and foods associated with user. populate logs associated with each food
      include: {
        rooms: true,
        foods: {
          include: {
            log: true,
          },
        },
      },
    });
    if (!getData) {
      // If no data is found, return a 404 Not Found error
      return { error: { status: '404', message: "User not found" } };
    }
    //   Have to map the prisma data to match the UserType
        const userResult: UserType = {
          id: getData.id,
          firstName: getData.firstName,
          lastName: getData.lastName,
          email: getData.email,
          clerkId: getData.clerkId,
          createdAt: getData.createdAt,
          updatedAt: getData.updatedAt,
          foods: getData.foods,
          rooms: getData.rooms,
        };
        // Return user
        return userResult;
  } catch (err) {
    console.log(err);
    if (err instanceof PrismaClientKnownRequestError) {
      // Handle Prisma-specific errors
      return { error: { status: err.code, message: err.message } };
    }
    // Other errors
    return { error: { status: '500', message: "Internal server error" } };
  }
};


// const seededUser = await prisma.user.update({
//   where: {
//     clerkId: clerkId,
//   },
//   data: {
//     foods: {
//       create: [
//         {
//           createdAt: new Date(Date.now()),
//           updatedAt: new Date(Date.now()),
//           description: "Beer",
//           price: 10.99,
//           amount: 10,
//           category: "Beverage",
//           threshold: 0,
//           expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
//           notes: "It's beer",
//           room: "My Refrigerator",
//         },
//       ],
//     },
//   },
// });