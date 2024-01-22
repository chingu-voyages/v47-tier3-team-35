import { revalidatePath } from 'next/cache';
import prisma from '../../../prisma/client';

export const addRoom = async (formData: FormData, thisUser: any) => {
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

export const editRoom = async (formData: FormData, thisUser: any) => {
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

export const deleteRoom = async (id: string, thisUser: any) => {
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
