import React from 'react';

import prisma from '../../../prisma/client';
import RoomListItem from './RoomListItem';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
// import FormData from

// dashboard/room/id3yr28u429

//dashboard(layout.tsx header,{children}, footer)

// /temp/db-test

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

    if (!roomName) {
      return;
    }

    if (thisUser) {
      try {
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

    revalidatePath('/room');
  };

  const editRoom = async (formData: FormData) => {
    'use server';
    // Do something with formData
    const roomName = formData.get('roomName');
    const id = formData.get('id');

    console.log('roomName', roomName);
    console.log('id', id);

    if (!roomName) {
      return;
    }
    if (thisUser) {
      try {
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
    revalidatePath('/room');
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
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
    revalidatePath('/room');
  };

  return (
    <main>
      <h1>Room Page</h1>
      <section>
        <h2>Your current rooms: {rooms?.length} </h2>
        <ul>
          {rooms?.map((room) => (
            <li key={room.id}>
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
        <form className='flex flex-col gap-3' action={addRoom}>
          <div className='flex flex-col gap-2'>
            <label htmlFor='roomName'>Add a room:</label>
            <input
              type='text'
              name='roomName'
              className='border border-gray-300 rounded-md px-2 py-1'
            />
          </div>
          <div>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded'
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
