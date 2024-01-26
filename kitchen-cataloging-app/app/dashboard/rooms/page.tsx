
import prisma from '../../../prisma/client';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { RoomSchema } from './schema';
import RoomList from './RoomList';
import { RoomType} from '../../../data/types';
import RoomAdd from './RoomAdd';


const RoomPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  // Sadly, there is no way to paginate (take/ skip) included relations in prisma, so two calls are needed: one for the user, one for the initial rooms shown.
  // This also includes the count of total rooms to be used for pagination
  const thisUser = await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    },
    include: {
      _count: {
        select: {rooms: true}
      }
    }
  });

// Need this in case thisUser fails to retrieve
  if (!thisUser) {
    redirect("/");
  }


// Returns first 5 rooms upon page load. (Order by desc puts newest rooms first.) Use paginate rooms to show next group of 5 rooms (function used in RoomList component).
  const rooms = await prisma.room.findMany({
    take: 5,
    where: {
      userId: thisUser?.id
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main>
      <h1>Room Page</h1>
      <RoomList
        rooms={rooms ? rooms : []}
        userId={thisUser.id}
        totalRooms={thisUser?._count.rooms ? thisUser._count.rooms : 0}
      />
      <hr />
      <section>
        <RoomAdd userId={thisUser.id} />
      </section>
    </main>
  );
};

export default RoomPage;
