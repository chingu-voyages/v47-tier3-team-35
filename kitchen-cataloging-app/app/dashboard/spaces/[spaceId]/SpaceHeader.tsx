// "use client";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import { Box } from "@mui/material";
// import useWindowWidth from "@/hooks/useWindowWidth";
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
const SpaceHeader = ({
  spaceId,
  spaceName,
}: {
  spaceId: string;
  spaceName: string;
}) => {
  return (
    <Box className="flex flex-col w-full">
      <NavigationDepthBar items={navigationDepthArr({ spaceId, spaceName })} />
    </Box>
  );
};
export default SpaceHeader;