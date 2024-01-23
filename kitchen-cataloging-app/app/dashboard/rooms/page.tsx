import React from 'react';

import prisma from '../../../prisma/client';
import RoomListItem from './RoomListItem';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { RoomSchema } from './schema';

const RoomPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  const thisUser = await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    },
    include: {
      rooms: true,
    },
  });

  const rooms = thisUser?.rooms;

  
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

    const validation = RoomSchema.safeParse(roomName);

    // Validate room name (between 3-30 characters)
    if (!validation.success) {
      console.error(validation.error.issues)
      return
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
          console.error("Error: Room name already exists");
          return;
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

  const deleteRoom = async (id: string) => {
    'use server';
    // Do something with id
    if (thisUser) {
      try {
        await prisma.room.delete({
          where: {
            id: id,
          },
        });
        // To delete food, we want the room to be related by the room's ID, not the room's name.
        // await prisma.food.deleteMany({
        //   where: {
        //     room: id,
        //   }
        // })
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
    revalidatePath('/rooms');
  };

  return (
    <main>
      <h1>Room Page</h1>
      <section>
        <h2>Your current rooms: {rooms?.length} </h2>
        <ul className="list-none">
          {rooms?.map((room) => (
            <li key={room.id} className="flex px-2 py-1 gap-2">
              <RoomListItem
                id={room.id}
                title={room.title}
                editRoom={editRoom}
                deleteRoom={deleteRoom}
              />
            </li>
          ))}
        </ul>
      </section>
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
