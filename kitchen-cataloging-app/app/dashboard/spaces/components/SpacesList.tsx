"use client";
import { Room } from "@prisma/client";
import { paginateRooms } from "../actions";
import PaginationWrapper from "@/components/utils/PaginationWrapper";
import { CircularProgress } from "@mui/material";
import useWindowWidth from "@/hooks/useWindowWidth";
import { DesktopSpacesList } from "./DesktopSpacesList";
import { MobileSpacesList } from "./MobileSpacesList";
const SpaceList = ({ defaultItems }: { defaultItems: Room[] | null }) => {
  const mediumWidth = useWindowWidth(640);
  const largeWidth = useWindowWidth(1024);
  return (
    <PaginationWrapper
      paginate={paginateRooms}
      take={20}
      defaultItems={defaultItems}
      loadingComponent={(ref) => (
        <CircularProgress
          ref={ref}
          size={largeWidth ? "large" : mediumWidth ? "medium" : "small"}
        />
      )}
    >
      {(props) => (
        <>
          {largeWidth || mediumWidth ? (
            <DesktopSpacesList data={props.data} largeWidth={largeWidth} />
          ) : (
            <MobileSpacesList data={props.data} />
          )}
        </>
      )}
    </PaginationWrapper>
  );
};
export default SpaceList;
