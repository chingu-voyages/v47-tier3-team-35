"use client";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Room } from "@prisma/client";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { SearchBar } from "./SearchBar";
import SpaceHeaderBottomBox from "./wrappers/SpaceHeaderBottomBox";
import SpaceHeaderTopmostBox from "./wrappers/SpaceHeaderTopmostBox";
import SpaceHeaderBox from "./wrappers/SpaceHeaderBox";
import SpaceActionBtnsWrapper from "./wrappers/SpaceActionBtnsWrapper";
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
    <SpaceActionBtnsWrapper>
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
    </SpaceActionBtnsWrapper>
  );
};
const SpaceHeader = ({ defaultData }: { defaultData?: Room }) => {
  const [spaceData, setSpaceData] = useState<Partial<Room>>(defaultData || {});
  const largeWidth = useWindowWidth(1024);
  const mediumWidth = useWindowWidth(768);
  return (
    <SpaceHeaderBox>
      <Typography
        className="font-medium leading-4 md:leading-5 xl:leading-6 text-default-ref-neutral-neutral50"
        noWrap
        variant={largeWidth ? "body1" : mediumWidth ? "body2" : "button"}
        sx={{
          textTransform: "none",
        }}
      >{`${spaceData.itemCount} items in stock`}</Typography>
      <SpaceHeaderTopmostBox>
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
      </SpaceHeaderTopmostBox>
      <SpaceHeaderBottomBox>
        <SearchBar spaceId={spaceData.id} />
        {mediumWidth && <AddItemBtn />}
      </SpaceHeaderBottomBox>
    </SpaceHeaderBox>
  );
};
export default SpaceHeader;
