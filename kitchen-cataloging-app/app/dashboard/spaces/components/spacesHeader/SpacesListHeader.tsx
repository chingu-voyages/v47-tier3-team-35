"use client";
import useWindowWidth from "@/hooks/useWindowWidth";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
const SpacesListHeader = () => {
  const largeWidth = useWindowWidth(1024);
  const mediumWidth = useWindowWidth(640);
  return (
    <Box className="flex flex-col w-full pb-4 mt-5 sm:pb-6 lg:pb-9 sm:mt-4 lg:mt-6 lg:mb-0">
      <Button
        variant="text"
        className="space-x-1.5 sm:space-x-2.5 justify-start pl-0 w-fit"
      >
        <AddIcon
          className="p-[0.25rem] md:p-[0.2rem] lg:p-0 font-normal"
          fontSize={"large"}
        />
        <Typography
          variant={largeWidth ? "subtitle2" : mediumWidth ? "body1" : "body2"}
          className="font-medium"
          sx={{
            textTransform: "none",
          }}
        >
          Add Space
        </Typography>
      </Button>
    </Box>
  );
};
export default SpacesListHeader;
