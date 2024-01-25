import React from 'react';

import prisma from '../../../prisma/client';
import RoomListItem from './RoomListItem';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { RoomSchema } from './schema';
import RoomList from './RoomList';
import { RoomType } from '../../../data/types';

const RoomPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  // Sadly, there is no way to paginate (take/ skip) included relations in prisma, so two calls are needed: one for the user, one for the initial rooms shown.
  // This also includes the count of total rooms to be used for pagination
  const thisUser = await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    },
    include: {
      _count: {
        select: {rooms: true}
      }
    }
  });

// Returns first 5 rooms upon page load. Use paginate rooms to show next group of 5 rooms (function found in RoomList component).
  const rooms = await prisma.room.findMany({
    take: 5,
    where: {
      userId: thisUser?.id
    }
  });


  // Paginate rooms
  const paginateRooms = async (
    userId: string,
    cursor: string,
    take: number
  ): Promise<RoomType[]> => {
    "use server";
    console.log(take)
    try {
      if (userId && cursor) {
        const nextRooms = await prisma.room.findMany({
          take: take,
          skip: 1, // Skip the cursor
          cursor: {
            id: cursor,
          },
          where: {
            userId: userId,
          },
        });
        if (nextRooms) {
          return nextRooms;
        } else {
          throw new Error("No rooms found");
        }
      }
    } catch (error) {
      console.error("Error paginating rooms:", error);
    }
    return [];
  };

  const addRoom = async (formData: FormData) => {
    'use server';

    const roomName = formData.get('roomName');

    const validation = RoomSchema.safeParse(roomName);

    // Validate room name (between 3-30 characters)
    if (!validation.success) {
      console.error(validation.error.issues);
      return;
    }

      // Make sure room name is unique for this user
        
    if (thisUser) {
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
            userId: thisUser?.id,
          },
        });
      } catch (error) {
        console.error('Error creating room:', error);
      }
    }

    revalidatePath('/rooms');
  };

  const editRoom = async (formData: FormData) => {
    'use server';
    // Do something with formData
    const roomName = formData.get('roomName');
    const id = formData.get('id');

    // Validate room name (between 3-30 characters)
    const validation = RoomSchema.safeParse(roomName);

    if (!validation.success) {
      // validation.issues.error is a ZodError[], so had to join. 
      throw new Error(validation.error.issues.join())      
    }

    if (thisUser) {
      // Make sure room name is unique for this user
      try {
        const existingRoomName = await prisma.room.findFirst({
          where: {
            title: roomName as string,
          },
        });

        if (existingRoomName) {
          throw new Error("Room name already exists");
        }
        // Update room name if all checks/validation passed
        await prisma.room.update({
          where: {
            id: id as string,
          },
          data: {
            title: roomName as string,
          },
        });
      } catch (error) {
        console.error('Error updating room:', error);
      }
    }
    revalidatePath('/rooms');
  };

  const deleteRoom = async (title: string, id: string) => {
    'use server';
    if (thisUser) {

      try {
        // Make sure no food exists in this room before deleting. Use room title to access food
        const foodinRoom = await prisma.food.findMany({
          where: {
            room: title
          }
        })
        if (foodinRoom.length > 0) {
          throw new Error('You cannot delete a room with food in it.')
        }

        // Need to use id to delete becuase it is unique
        await prisma.room.delete({
          where: {
            id: id,
          },
        });
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
    revalidatePath('/rooms');
  };

  return (
    <main>
      <h1>Room Page</h1>
      <RoomList
        rooms={rooms ? rooms : []}
        userId={thisUser?.id ? thisUser.id : ''}
        totalRooms={thisUser?._count.rooms ? thisUser._count.rooms : 0}
        editRoom={editRoom}
        deleteRoom={deleteRoom}
        paginateRooms={paginateRooms}
      />
      <hr />
      <section>
        <form className="flex flex-col gap-3" action={addRoom}>
          <div className="flex flex-col gap-2">
            <label htmlFor="roomName">Add a room:</label>
            <input
              type="text"
              name="roomName"
              className="border border-gray-300 rounded-md px-2 py-1"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default RoomPage;
