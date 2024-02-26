"use server";
// import { revalidatePath } from "next/cache";
import { Room } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { paginateSpaces } from "./search/paginateSpaces";
import { getSingleRoom } from "./crud/getSingleRoom";
import { addSingleRoom } from "./crud/addSingleRoom";
import deleteManyRooms from "./crud/deleteManyRooms";
import editSingleRoom from "./crud/editSingleRoom";
import {
  PaginationProps,
  SearchFuncProps,
} from "@/components/pagination/types";
import searchSpaces from "./search/searchSpaces";
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
export const searchRooms = async (
  props: PaginationProps & Pick<SearchFuncProps, "text">
) => {
  if (!props.text) return await paginateRooms(props);
  else return await searchSpaces(props);
};
export const getRoom = async ({ id }: { id: string }) => {
  const { userId } = auth();
  return await getSingleRoom({ id, userId });
};

// ADD ROOM ----------
export const addRoom = async (formData: FormData) => {
  const roomName = formData.get("roomName")?.toString();
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
export const editRoom = async (formData: FormData) => {
  const { userId } = auth();
  // Do something with formData
  const roomName = formData.get("roomName")?.toString();
  const roomId = formData.get("roomId")?.toString();
  return await editSingleRoom({ roomId, roomName, userId });
  //revalidatePath("/spaces");
};
