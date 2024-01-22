'use client';

import { useState } from 'react';

interface RoomListItem {
  id: string;
  title: string;
  editRoom: (formData: FormData) => void;
  deleteRoom: (id: string) => void;
}

const RoomListItem = ({ id, title, editRoom, deleteRoom }: RoomListItem) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(title);

  return (
    <>
      {!isEditing ? (
        <p>{title}</p>
      ) : (
        <form
          action={async() => {
            editRoom

          }}
        >
          <input
            className='border border-gray-300 rounded-md px-2 py-1'
            type='text'
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            name='roomName'
          />
          <input className='hidden' type='text' value={id} name='id' readOnly />
          <button type='submit'>Submit</button>
        </form>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      <button onClick={() => deleteRoom(id)}>Delete</button>
    </>
  );
};

export default RoomListItem;
