import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
// import prisma from "../../../../prisma/client";
// interface Room {
//   params: {
//     roomTitle: string;
//   };
// }
// api call to get all room info and foods for the room
const Room = async ({ params }: { params: { roomTitle: string } }) => {
  const user = await currentUser();
  // Uses room name to find room based on the user id. Also includes foods that matches that room name
  const roomTitle = params.roomTitle;
  if (!user) {
    redirect("/");
  }
  // const thisUser = await prisma.user.findUnique({
  //   where: {
  //     clerkId: user?.id,
  //   },
  //   include: {
  //     rooms: {
  //       where: {
  //         title: roomTitle,
  //       },
  //     },
  //     foods: {
  //       where: {
  //         room: roomTitle,
  //       }
  //     }
  //   },
  // });

  // const thisRoom = thisUser?.rooms[0];
  // console.log(thisUser);
  return (
    <div>
      {/* <h1>This is room: {thisRoom?.title}</h1>
      <Link href='/dashboard/rooms'>Back to all Rooms</Link>
      <p>Here are the food items in this room:</p>
      <ul>
        {thisUser?.foods.map((food) => (
          <li key={food.id}>{food.description}</li>
      ))}
      </ul>  */}
    </div>
  );
};

export default Room;
