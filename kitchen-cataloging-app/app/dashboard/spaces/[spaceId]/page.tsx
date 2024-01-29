import Link from "next/link";
import { getSingleRoom } from "../actions";
import { Button } from "@mui/material";


const Space = async ({ params }: { params: { spaceId: string } }) => {
  // Uses room name to find room based on the user id. Also includes foods that matches that room name
  const spaceId = params.spaceId;
  
  const spaceData = await getSingleRoom(spaceId)

  return (
    <div>
      <h1>This is room: {spaceData?.title}</h1>
      <Link href="/dashboard/spaces">Back to all Rooms</Link>
      <p>Here are the food items in this room:</p>
      <ul>
        {spaceData?.foods.map((food) => (
          <li key={food.id}>
            <Link
              href={{ pathname: `/dashboard/spaces/${spaceId}/${food.id}`,
                query: {
                  spaceTitle: spaceData.title
                }
              }}
            >
              <Button>{food.description}</Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Space;
