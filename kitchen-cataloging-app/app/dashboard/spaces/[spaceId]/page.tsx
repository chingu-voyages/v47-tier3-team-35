import { Box } from "@mui/material";
import { getSingleRoom } from "../actions";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import SpaceHeader from "./components/header/SpaceHeader";
import { paginateFoodItems } from "./actions";
import InventoryList from "./components/inventoryList/InventoryList";
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
  // Uses room name to find room based on the user id. Also includes foods that matches that room name
  const spaceId = params.spaceId;
  const roomData = await getSingleRoom(spaceId);
  const itemData = await paginateFoodItems({ spaceId: spaceId, take: 20 });
  //guard clause in case no data is returned
  if (!roomData) return <></>;
  return (
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
  );
};

export default Room;
