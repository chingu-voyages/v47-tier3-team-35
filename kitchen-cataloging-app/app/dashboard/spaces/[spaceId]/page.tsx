import { Box } from "@mui/material";
import { getSingleRoom } from "../actions";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import SpaceHeader from "./SpaceHeader";
import { paginateFoodItems } from "./actions";
import InventoryList from "./InventoryList";
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
  const roomId = params.spaceId;
  const roomData = await getSingleRoom({ id: roomId });
  const itemData = await paginateFoodItems({ take: 20 });
  //guard clause in case no data is returned
  if (!roomData) return <></>;
  return (
    <Box className="flex flex-col">
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
