import React from 'react'

import prisma from '../../prisma/client'
import RoomListItem from './RoomListItem';



const RoomPage = async () => {
    
    const rooms = await prisma.room.findMany(
        // where: 
    );

    return (        
      <main>
            <h1>Room Page</h1>
            <section>
                <h2>Your current rooms: </h2>
                <ul>
                    {
                        rooms.map((room) => (
                            <li
                                key={room.id}
                            >
                                <RoomListItem id={room.id} title={room.title} />
                            </li>
                        ))
                    }
                </ul>
            </section>
        <section>
          <form>
            <label htmlFor="roomName">Add a room:</label>
            <input type="text" name="roomName" />
          </form>
        </section>
      </main>
    );
}

export default RoomPage
