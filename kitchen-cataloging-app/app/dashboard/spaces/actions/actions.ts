"use server";
// import { revalidatePath } from "next/cache";
import { RoomSchema } from "../utils/schema";
import { Room } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { paginateSpaces } from "./search/paginateSpaces";
import { getRoom } from "./crud/getSingleRoom";
import { addSingleRoom } from "./crud/addSingleRoom";
import deleteManyRooms from "./crud/deleteManyRooms";
import editSingleRoom from "./crud/editSingleRoom";
import { PaginationProps } from "@/components/pagination/types";
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
export const addRoom = async (formData: FormData) => {
  const roomName = formData.get("roomName")?.toString();
  const validation = RoomSchema.safeParse(roomName);
  // Validate room name (between 3-30 characters)
  if (!validation.success) {
    console.error(validation.error.issues);
    return;
  }
  const { userId } = auth();
  return await addSingleRoom({ userId, roomName });
  // revalidatePath("/spaces");
};

// DELETE ROOM ----------
export const deleteRooms = async (ids: string[]) => {
  const { userId } = auth();
  return await deleteManyRooms({ userId, ids });
  // revalidatePath("/spaces");
};

// EDIT ROOM ---------------

export const editRoom = async (formData: FormData, userId: string) => {
  // Do something with formData
  const roomName = formData.get("roomName")?.toString();
  const roomId = formData.get("roomId")?.toString();
  // Validate room name (between 3-30 characters)
  const validation = RoomSchema.safeParse(roomName);
  if (!validation.success) {
    // validation.issues.error is a ZodError[], so had to join.
    throw new Error(validation.error.issues.join());
  }
  return await editSingleRoom({ roomId, roomName, userId });
  //revalidatePath("/spaces");
};
