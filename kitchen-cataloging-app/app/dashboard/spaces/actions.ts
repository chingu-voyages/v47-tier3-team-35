"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { RoomSchema } from "./utils/schema";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { Room } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { PaginationProps, paginateSpaces } from "./utils/paginateSpaces";
import { getRoom } from "./utils/getSingleRoom";

// PAGINATE ROOMS -----------
export async function paginateRooms(
  props: PaginationProps
): Promise<Room[] | null> {
  try {
    const { userId } = auth();
    return await paginateSpaces({ ...props, userId });
  } catch (error: any) {
    console.error("Error paginating rooms:", error);
    return null;
  }
}
export const getSingleRoom = async ({ id }: { id: string }) => {
  const { userId } = auth();
  return await getRoom({ id, userId });
};

// ADD ROOM ----------
export const addRoom = async (formData: FormData, userId: string) => {
  const roomName = formData.get("roomName");

  const validation = RoomSchema.safeParse(roomName);

  // Validate room name (between 3-30 characters)
  if (!validation.success) {
    console.error(validation.error.issues);
    return;
  }

  // Make sure room name is unique for this user

  if (userId) {
    try {
      // Make sure room name is unique for this user
      const existingRoomName = await prisma.room.findFirst({
        where: {
          title: roomName as string,
        },
      });

      if (existingRoomName) {
        console.error("Error: Room name already exists");
        return;
      }

      // Add new room if all checks/validation passed
      await prisma.room.create({
        data: {
          title: roomName as string,
          userId: userId,
        },
      });
    } catch (error) {
      console.error("Error creating room:", error);
    }
  }

  revalidatePath("/spaces");
};

// DELETE ROOM ----------

export const deleteRoom = async (
  roomId: string,
  id: string,
  userId: string
) => {
  if (userId) {
    try {
      // Make sure no food exists in this room before deleting. Use room title to access food
      const foodinRoom = await prisma.food.findMany({
        where: {
          roomId: roomId,
        },
      });
      if (foodinRoom.length > 0) {
        throw new Error("You cannot delete a room with food in it.");
      }

      // Need to use id to delete becuase it is unique
      const deletedRoom = await prisma.room.delete({
        where: {
          id: id,
        },
      });
      return {
        deletedRoom,
      };
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  }
  revalidatePath("/spaces");
};

// EDIT ROOM ---------------

export const editRoom = async (formData: FormData, userId: string) => {
  // Do something with formData
  const roomName = formData.get("roomName");
  const roomId = formData.get("roomId");

  // Validate room name (between 3-30 characters)
  const validation = RoomSchema.safeParse(roomName);

  if (!validation.success) {
    // validation.issues.error is a ZodError[], so had to join.
    throw new Error(validation.error.issues.join());
  }

  if (userId) {
    // Update room name if all checks/validation passed
    try {
      const editedRoom = await prisma.room.update({
        where: {
          id: roomId as string,
        },
        data: {
          title: roomName as string,
        },
      });

      // Update all foods in this room to match new room title
      const editedFoods = await prisma.food.updateMany({
        where: {
          roomId: roomId as string,
        },
        data: {
          roomTitle: roomName as string,
        },
      });
      console.log(`Edited room: ${editedRoom} \n Edited Foods: ${editedFoods}`);
    } catch (error) {
      console.error("Error updating room:", error);
    }
  }
  revalidatePath("/spaces");
};
