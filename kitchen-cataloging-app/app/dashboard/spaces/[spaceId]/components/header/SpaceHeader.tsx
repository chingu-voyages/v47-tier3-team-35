"use client";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Room } from "@prisma/client";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const AddItemBtn = () => {
  return (
    <Button
      variant="contained"
      className="font-medium rounded-full flex items-center"
    >
      <AddIcon fontSize="medium" />
      <Typography
        variant="button"
        sx={{
          textTransform: "none",
        }}
      >
        Add Item
      </Typography>
    </Button>
  );
};
const SearchBar = ({ mediumWidth }: { mediumWidth: boolean }) => {
  return <Box className="flex w-full">{!mediumWidth && <AddItemBtn />}</Box>;
};
const SpaceActionBtns = ({ mediumWidth }: { mediumWidth: boolean }) => {
  return (
    <Box className="w-full flex flex-row mt-1.5 md:w-auto md:mt-0">
      <Box className="flex flex-grow">
        <IconButton>
          <EditOutlinedIcon
            fontSize={"inherit"}
            className="text-9xl text-default-sys-light-tertiary "
          />
        </IconButton>
        <IconButton>
          <DeleteOutlineOutlinedIcon
            fontSize={"inherit"}
            className="text-9xl text-red-800"
          />
        </IconButton>
      </Box>
      {!mediumWidth && <AddItemBtn />}
    </Box>
  );
};
const SpaceHeader = ({ defaultData }: { defaultData?: Room }) => {
  const [roomData, setRoomData] = useState<Partial<Room>>(defaultData || {});
  const largeWidth = useWindowWidth(1280);
  const mediumWidth = useWindowWidth(768);
  const smallWidth = useWindowWidth(480);
  return (
    <Box className="flex flex-col w-full min-h-0 min-w-0">
      <Typography
        className="font-medium leading-4 md:leading-5 xl:leading-6 mt-7 sm:mt-5 lg:mt-8 text-default-ref-neutral-neutral50"
        noWrap
        variant={largeWidth ? "body1" : mediumWidth ? "body2" : "button"}
        sx={{
          textTransform: "none",
        }}
      >{`${roomData.itemCount} items in stock`}</Typography>
      <Box className="flex flex-col md:flex-row mb-6 sm:mb-6 lg:mb-9 min-h-0 min-w-0">
        <Typography
          noWrap
          className="font-normal leading-snug xl:leading-normal text-default-ref-neutral-neutral30 md:flex-grow"
          variant={largeWidth ? "h1" : mediumWidth ? "h2" : "h3"}
        >
          {roomData.title} fwefiefjwe ifiweof we iwef owefewiofweof weiofwef
          iowejfo
        </Typography>
        <SpaceActionBtns mediumWidth={mediumWidth} />
      </Box>
    </Box>
  );
};
export default SpaceHeader;
