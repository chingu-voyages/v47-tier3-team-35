"use client";
import { Box, IconButton, Typography } from "@mui/material";
import { Room } from "@prisma/client";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { SearchBar } from "./SearchBar";
import SpaceHeaderBottomBox from "./wrappers/SpaceHeaderBottomBox";
import SpaceHeaderTopmostBox from "./wrappers/SpaceHeaderTopmostBox";
import SpaceHeaderBox from "./wrappers/SpaceHeaderBox";
import SpaceActionBtnsWrapper from "./wrappers/SpaceActionBtnsWrapper";
import AddItemBtn from "@/components/actionBtns/AddItemBtn";
import FoodForm from "@/components/form/forms/foodForm/FoodForm";
import SpaceForm from "@/components/form/forms/spaceForm/SpaceForm";
const SpaceActionBtns = ({
  spaceId,
  children,
}: {
  spaceId?: string;
  children: React.ReactNode;
}) => {
  return (
    <SpaceActionBtnsWrapper>
      <Box className="flex flex-grow">
        <SpaceForm actionType="edit" itemId={spaceId}>
          {(props) => (
            <IconButton onClick={props.handleOpen}>
              <EditOutlinedIcon
                fontSize={"inherit"}
                className="text-10xl sm:text-11xl lg:text-12xl text-default-sys-light-tertiary "
              />
            </IconButton>
          )}
        </SpaceForm>
            
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
const SpaceHeader = ({
  defaultData,
  spaceNames,
  userId,
}: {
  defaultData?: Room;
  spaceNames: { title: string }[];
  userId: string;
}) => {
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
        <SpaceActionBtns spaceId={defaultData?.id}>
          {!mediumWidth && (
            <FoodForm
              actionType="create"
              spaces={spaceNames.map((space) => space.title)}
              userId={userId}
            >
              {(props) => <AddItemBtn onClick={props.handleOpen} />}
            </FoodForm>
          )}
        </SpaceActionBtns>
      </SpaceHeaderTopmostBox>
      <SpaceHeaderBottomBox>
        <SearchBar spaceId={spaceData.id} />
        {mediumWidth && (
          <FoodForm
            actionType="create"
            spaces={spaceNames.map((space) => space.title)}
            userId={userId}
          >
            {(props) => <AddItemBtn onClick={props.handleOpen} />}
          </FoodForm>
        )}
      </SpaceHeaderBottomBox>
    </SpaceHeaderBox>
  );
};
export default SpaceHeader;
