"use client";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import useWindowWidth from "@/hooks/useWindowWidth";
import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
const SpacesHeader = () => {
  const largeWidth = useWindowWidth(1024);
  const mediumWidth = useWindowWidth(640);
  return (
    <div className="flex flex-col w-full pt-7 pb-6 lg:pt-12 lg:pb-9 sm:space-y-4 lg:space-y-6 lg:mb-0">
      <NavigationDepthBar
        items={[
          {
            routePath: "dashboard",
            title: "Home",
          },
          { routePath: "spaces", title: "Spaces" },
        ]}
      />
      <Button variant="text" className="space-x-2.5 justify-start pl-0 w-fit">
        <AddIcon className="p-[0.1rem] lg:p-0" fontSize={"large"} />
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
