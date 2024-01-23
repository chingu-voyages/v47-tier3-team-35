import { currentUser } from "@clerk/nextjs";
import prisma from "../../../../prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Room {
  params: {
    roomId: string;
  };
}

// api call to get all room info and foods for the room

const Room = async ({ params }: { params: { roomId: string } }) => {
  const user = await currentUser();
  const roomId = params.roomId;

  if (!user) {
    redirect("/");
  }

  const thisUser = await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    },
    include: {
      rooms: {
        where: {
          id: roomId,
        },
      },
// Right now, the foods are related to the room by the room NAME. Should we change the schema to save the room ID to avoid multple API calls?
    //   foods: {
    //     where: {
    //       room: roomId,
    //     }
    //   }
    },
  });

  const thisRoom = thisUser?.rooms[0];
  console.log(thisUser);

  return (
    <div>
      <p>This is room: {thisRoom?.title}</p>
      <Link href='/dashboard/rooms'>Back to all Rooms</Link>
    </div>
  );
};

export default Room;
