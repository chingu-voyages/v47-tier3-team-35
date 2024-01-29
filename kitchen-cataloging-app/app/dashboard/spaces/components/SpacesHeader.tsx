"use client";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import useWindowWidth from "@/hooks/useWindowWidth";
import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
const SpacesHeader = () => {
  const largeWidth = useWindowWidth(1024);
  const mediumWidth = useWindowWidth(640);
  return (
    <div className="flex flex-col w-full sm:space-y-4 sm:mb-4 lg:space-y-6 lg:mb-6">
      <NavigationDepthBar
        items={[
          {
            routePath: "dashboard",
            title: "Home",
          },
          { routePath: "spaces", title: "Spaces" },
        ]}
      />
      <Button variant="text" className="space-x-2 justify-start pl-0 w-fit">
        <AddIcon fontSize={largeWidth ? "large" : "medium"} />
        <Typography
          variant={largeWidth ? "subtitle1" : "body1"}
          className="font-medium"
          sx={{
            textTransform: "none",
          }}
        >
          Add Space
        </Typography>
      </Button>
    </div>
  );
};
export default SpacesHeader;
