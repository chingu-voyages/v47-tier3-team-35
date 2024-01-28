"use client";
import { Room } from "@prisma/client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { paginateRooms } from "../actions";
import { unstable_batchedUpdates } from "react-dom";
import PaginationWrapper from "@/components/utils/PaginationWrapper";
import { CircularProgress } from "@mui/material";
const SpaceList = ({ defaultItems }: { defaultItems: Room[] | null }) => {
  //   const [data, setData] = useState<Room[]>(defaultItems ? defaultItems : []);
  //   const [cursor, setCursor] = useState<string | null>(null);
  //   const [ref, inView] = useInView();
  //   const loadMore = async () => {
  //     const newItems = await paginateRooms({
  //       cursor: cursor ? cursor : undefined,
  //       take: 20,
  //     });
  //     if (!newItems) {
  //       return setCursor(null);
  //     }
  //     const newCursor = newItems[newItems.length - 1].id;
  //     unstable_batchedUpdates(() => {
  //       setData((prev) => [...prev, ...newItems]);
  //       setCursor(newCursor);
  //     });
  //   };
  //   useEffect(() => {
  //     if (inView) {
  //       loadMore();
  //     }
  //   }, [inView]);
  return (
    <PaginationWrapper
      paginate={paginateRooms}
      take={20}
      defaultItems={defaultItems}
      loadingComponent={(ref) => <CircularProgress ref={ref} size={"large"} />}
    >
      {(props) => (
        <div>
          {props.data.map((item) => (
            <div>{item.id}</div>
          ))}
        </div>
      )}
    </PaginationWrapper>
  );
};
export default SpaceList;
