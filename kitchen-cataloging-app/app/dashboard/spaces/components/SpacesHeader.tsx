"use client";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import useWindowWidth from "@/hooks/useWindowWidth";
import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
const SpacesHeader = () => {
  const largeWidth = useWindowWidth(1024);
  const mediumWidth = useWindowWidth(640);
  return (
    <div className="flex flex-col w-full pt-6 pb-4 sm:pt-7 sm:pb-6 lg:pt-12 lg:pb-9 sm:space-y-4 lg:space-y-6 lg:mb-0">
      <NavigationDepthBar
        items={[
          {
            routePath: "dashboard",
            title: "Home",
          },
          { routePath: "spaces", title: "Spaces" },
        ]}
      />
      <Button
        variant="text"
        className="space-x-1.5 sm:space-x-2.5 justify-start pl-0 w-fit"
      >
        <AddIcon className="p-[0.25rem] md:p-[0.2rem] lg:p-0 font-normal" fontSize={"large"} />
        <Typography
          variant={largeWidth ? "subtitle1" : mediumWidth ? "body1" : "body2"}
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
