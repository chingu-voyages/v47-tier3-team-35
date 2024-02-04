"use client";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Room } from "@prisma/client";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { SearchBar } from "./SearchBar";
const AddItemBtn = () => {
  return (
    <Button
      variant="contained"
      size="large"
      className="font-medium rounded-full flex items-center space-x-1.5 py-2.5 pl-4 pr-6 sm:space-x-2 sm:py-2.5 sm:pl-5 sm:pr-7 md:py-3 lg:space-x-2.5 lg:py-4 lg:pl-6 lg:pr-8"
      sx={{
        minHeight: "0",
        height: "fit-content",
      }}
    >
      <AddIcon className="text-6xl sm:text-8xl" />
      <Typography
        noWrap
        variant={"button"}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide leading-4 sm:leading-5 md:leading-6 lg:leading-8"
        sx={{
          textTransform: "none",
        }}
      >
        Add Item
      </Typography>
    </Button>
  );
};
const SpaceActionBtns = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="w-full flex flex-row items-center mt-3 md:w-auto md:mt-0">
      <Box className="flex flex-grow">
        <IconButton>
          <EditOutlinedIcon
            fontSize={"inherit"}
            className="text-10xl sm:text-11xl lg:text-12xl text-default-sys-light-tertiary "
          />
        </IconButton>
        <IconButton>
          <DeleteOutlineOutlinedIcon
            fontSize={"inherit"}
            className="text-10xl sm:text-11xl lg:text-12xl text-red-800"
          />
        </IconButton>
      </Box>
      {children}
    </Box>
  );
};
const SpaceHeader = ({ defaultData }: { defaultData?: Room }) => {
  const [spaceData, setSpaceData] = useState<Partial<Room>>(defaultData || {});
  const largeWidth = useWindowWidth(1024);
  const mediumWidth = useWindowWidth(768);
  return (
    <Box className="flex flex-col w-full min-h-0 min-w-0">
      <Typography
        className="font-medium leading-4 md:leading-5 xl:leading-6 mt-7 sm:mt-5 lg:mt-8 text-default-ref-neutral-neutral50"
        noWrap
        variant={largeWidth ? "body1" : mediumWidth ? "body2" : "button"}
        sx={{
          textTransform: "none",
        }}
      >{`${spaceData.itemCount} items in stock`}</Typography>
      <Box className="flex flex-col md:flex-row mb-6 sm:mb-6 lg:mb-7 min-h-0 min-w-0">
        <Typography
          noWrap
          className="font-normal leading-snug xl:leading-normal text-default-ref-neutral-neutral30 md:flex-grow"
          variant={largeWidth ? "h1" : mediumWidth ? "h2" : "h3"}
        >
          {spaceData.title}
        </Typography>
        <SpaceActionBtns>
          <>{!mediumWidth && <AddItemBtn />}</>
        </SpaceActionBtns>
      </Box>
      <Box className="flex items-center w-full mb-7 sm:mb-9 lg:mb-11 space-x-12">
        <SearchBar spaceId={spaceData.id} />
        {mediumWidth && <AddItemBtn />}
      </Box>
    </Box>
  );
};
export default SpaceHeader;
