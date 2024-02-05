import { Box } from "@mui/material";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import SpaceHeader from "./components/header/SpaceHeader";
import InventoryList from "./components/inventoryList/InventoryList";
import { auth } from "@clerk/nextjs";
import { getRoom } from "../utils/getSingleRoom";
import { paginateFoods } from "./utils/paginateFoods";
import ResponsivePaddingWrapper from "@/components/layout/ResponsivePaddingWrapper";
const navigationDepthArr = ({
  spaceId,
  spaceName,
}: {
  spaceId: string;
  spaceName: string;
}) => [
  { routePath: "dashboard", title: "Home" },
  { routePath: "spaces", title: "Spaces" },
  { routePath: spaceId, title: spaceName },
];
// api call to get all room info and foods for the room
const Room = async ({ params }: { params: { spaceId: string } }) => {
  const { userId } = auth();
  // Uses room name to find room based on the user id. Also includes foods that matches that room name
  const spaceId = params.spaceId;
  const roomDataPromise = getRoom({ id: spaceId, userId: userId });
  const itemDataPromise = paginateFoods({ spaceId: spaceId, take: 20, userId });
  //data
  const [roomData, itemData] = await Promise.all([
    roomDataPromise,
    itemDataPromise,
  ]);
  //guard clause in case no data is returned
  if (!roomData) return <></>;
  return (
    <ResponsivePaddingWrapper>
      <Box className="flex flex-col pb-6 sm:pb-7 lg:pb-12">
        <NavigationDepthBar
          items={navigationDepthArr({
            spaceId: roomData?.id,
            spaceName: roomData?.title,
          })}
        />
        <SpaceHeader defaultData={roomData} />
        <InventoryList spaceId={roomData.id} defaultItems={itemData} />
      </Box>
    </ResponsivePaddingWrapper>
  );
};

export default Room;
