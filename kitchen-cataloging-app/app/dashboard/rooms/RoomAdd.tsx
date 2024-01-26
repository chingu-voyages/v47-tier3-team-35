'use client'

import { useRef } from "react"
import { addRoom } from "./actions";


interface RoomAdd {
    userId: string;
}

const RoomAdd = ({ userId }: RoomAdd) => {
    
    const ref = useRef<HTMLFormElement>(null);

  return (
    <section>
          <form ref={ref} className="flex flex-col gap-3" action={async formData => {
              ref.current?.reset()
              await addRoom(formData, userId)
          }}>
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
  );
}

export default RoomAdd
