'use client';

import Link from 'next/link';
import { useState } from 'react';

interface RoomListItem {
  id: string;
  title: string;
  editRoom: (formData: FormData) => void;
  deleteRoom: (title: string, id: string) => void;
}

const RoomListItem = ({ id, title, editRoom, deleteRoom }: RoomListItem) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(title);

  return (
    <>
      {!isEditing ? (
        <Link className='font-bold underline text-gray-900 hover:text-blue-500 active:text-red-500' href={`rooms/${title}`}>{title}</Link>
      ) : (
        <form
            action={async (formData) => {
            editRoom(formData);
              setIsEditing(false);
              setEditName(title);
          }}
        >
          <input
            className="border border-gray-300 rounded-md px-2 py-1"
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            name="roomName"
            />
            {/* Uses the id to access the room -- need to send the id in the form in order to use server action with form. Therefore, a hidden input: */}
          <input className="hidden" type="text" value={id} name="id" readOnly />
          <button type="submit">Submit</button>
        </form>
      )}
      <button
        className={"border border-blue-300 rounded-md p-1"}
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Cancel" : "Edit"}
      </button>
      <button
        className={"border border-red-300 rounded-md p-1"}
        onClick={() => deleteRoom(title, id)}
      >
        Delete
      </button>
    </>
  );
};

export default RoomListItem;
