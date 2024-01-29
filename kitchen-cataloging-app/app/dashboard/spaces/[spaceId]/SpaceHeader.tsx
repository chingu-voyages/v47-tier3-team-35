// "use client";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import { Box } from "@mui/material";
import { Room } from "@prisma/client";
// import useWindowWidth from "@/hooks/useWindowWidth";
const SpaceHeader = ({ defaultData }: { defaultData: Room }) => {
  return (
    <>
      <Box className="flex flex-col w-full">{defaultData.title}</Box>
    </>
  );
};
export default SpaceHeader;
