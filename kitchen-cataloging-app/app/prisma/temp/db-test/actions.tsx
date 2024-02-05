"use server";
import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  mockData,
  UserType,
  ErrorType,
  FoodType,
  RoomType,
} from "../../mock/mockData";
type DataResult =
  | {
      user: UserType;
      foods: FoodType[];
      rooms: RoomType[];
    }
  | ErrorType;
// Seed User
export async function seedUser(clerkId: string): Promise<DataResult> {
  try {
    const seedData = mockData();
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
          create: seedData.foods,
        },
      },
      include: {
        rooms: true,
        foods: {
          include: {
            logs: true,
          },
        },
      },
    });
    const userResult = seededUser;
    const foodResult = seededUser.foods;
    const roomResult = seededUser.rooms;
    return {
      user: userResult,
      foods: foodResult,
      rooms: roomResult,
    };
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
export async function fetchData(userId: string): Promise<DataResult> {
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
            logs: true,
          },
        },
      },
    });
    if (!getData) {
      // If no data is found, return a 404 Not Found error
      return { error: { status: "404", message: "User not found" } };
    }
    //   Have to map the prisma data to match the UserType
    const userResult = getData;
    const foodResult = getData.foods;
    const roomResult = getData.rooms;

    // Return user
    return {
      user: userResult,
      foods: foodResult,
      rooms: roomResult,
    };
  } catch (err) {
    console.log(err);
    if (err instanceof PrismaClientKnownRequestError) {
      // Handle Prisma-specific errors
      return { error: { status: err.code, message: err.message } };
    }
    // Other errors
    return { error: { status: "500", message: "Internal server error" } };
  }
}
