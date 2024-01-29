import { Box } from "@mui/material";
import { getSingleRoom } from "../actions";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import SpaceHeader from "./SpaceHeader";
// api call to get all room info and foods for the room
const Room = async ({ params }: { params: { spaceId: string } }) => {
  // Uses room name to find room based on the user id. Also includes foods that matches that room name
  const roomId = params.spaceId;
  const roomData = await getSingleRoom({ id: roomId });
  //guard clause in case no data is returned
  if (!roomData) return <></>;
  return (
    <Box className="flex flex-col">
      <SpaceHeader spaceId={roomData?.id} spaceName={roomData?.title} />
    </Box>
  );
};

export default Room;
