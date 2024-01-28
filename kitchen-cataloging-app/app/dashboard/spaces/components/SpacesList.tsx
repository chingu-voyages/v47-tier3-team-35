"use client";
import { Room } from "@prisma/client";
import { paginateRooms } from "../actions";
import PaginationWrapper from "@/components/utils/PaginationWrapper";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWidth";
import { Grid } from "@mui/material";
const ListDesktop = () => {};
const ListMobile = () => {};
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
        <Grid container spacing={2}>
          {props.data.map((item) => (
            <Grid item key={item.id} >
              <Link
                className="flex flex-col"
                href={`/dashboard/spaces/${item.id}}`}
              >
                {item.id}
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </PaginationWrapper>
  );
};
export default SpaceList;
