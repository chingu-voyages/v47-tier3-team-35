"use client";
import { Room } from "@prisma/client";
import { paginateRooms } from "../../../../actions/space/actions";
import PaginationWrapper from "@/components/pagination/PaginationWrapper";
import useWindowWidth from "@/hooks/useWindowWidth";
import { DesktopSpacesList } from "./DesktopSpacesList";
import { MobileSpacesList } from "./MobileSpacesList";
import FullPagePaginationLoadingComponent from "@/components/pagination/FullPagePaginationLoadingComponent";
const SpaceList = ({ defaultItems }: { defaultItems: Room[] | null }) => {
  const mediumWidth = useWindowWidth(640);
  const largeWidth = useWindowWidth(1024);
  return (
    <PaginationWrapper
      paginate={paginateRooms}
      take={20}
      defaultItems={defaultItems}
      loadingComponent={(ref) => (
        <FullPagePaginationLoadingComponent setRef={ref} />
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
