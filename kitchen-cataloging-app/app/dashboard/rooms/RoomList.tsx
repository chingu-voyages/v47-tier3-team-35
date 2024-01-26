'use client'

import { useState, useEffect } from "react";
import { RoomType } from "../../../data/types";
import RoomListItem from "./RoomListItem";
import { paginateRooms } from "./actions";


// Needed to pull RoomList into a client component in order to create pagination.

interface RoomList {
    rooms: RoomType[];
    userId: string;
    totalRooms: number,    
}

const RoomList = ({rooms, userId, totalRooms}: RoomList) => {
    
    const [showRooms, setShowRooms] = useState(rooms)
    const [page, setPage] = useState(0)

    const paginateAmount = 5;
    const lastPage = Math.floor(totalRooms / paginateAmount);

    // Set cursor at last room shown (by the id of that room) for pagination
    
    const cursorForward = showRooms ? showRooms[showRooms.length - 1]?.id : '';
    const cursorBack = showRooms ? showRooms[0]?.id : '';

  // Update rooms when rooms change by edit or delete
  useEffect(() => {
    setShowRooms(rooms)
    setPage(0)
   }, [rooms])


  return (
    <section>
      <h2>
        Your current rooms: Showing {paginateAmount * page + 1} -{" "}
        {(paginateAmount * page + paginateAmount) < totalRooms ? (paginateAmount * page + paginateAmount) : totalRooms} of {totalRooms} rooms.
      </h2>
      <ul className="list-none">
        {showRooms?.map((room) => (
          <li key={room.id} className="flex px-2 py-1 gap-2">
            <RoomListItem
              id={room.id}
              title={room.title}
              userId={userId}
            />
          </li>
        ))}
      </ul>
      <button
        className={
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        }
        disabled={page === 0}
        onClick={async () => {
          //   Do not go back if you are on the first page
          if (page !== 0) {
            setShowRooms(
              await paginateRooms(userId, cursorBack, -paginateAmount)
            );
            setPage(page - 1);
          }
        }}
      >
        {"<<<"} Prev page
      </button>
      <button
        className={
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
        }
        disabled={page + 1 > lastPage}
        onClick={async () => {
          {
            if (page + 1 <= lastPage) {
              const newRooms = await paginateRooms(
                userId,
                cursorForward,
                paginateAmount
              );
              setShowRooms(newRooms);
              setPage(page + 1);
            }
          }
        }}
      >
        Next page {">>>"}
      </button>
    </section>
  );
}

export default RoomList
