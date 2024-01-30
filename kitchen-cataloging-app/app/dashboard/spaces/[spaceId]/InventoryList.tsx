"use client";
import PaginationWrapper from "@/components/utils/PaginationWrapper";
import useWindowWidth from "@/hooks/useWindowWidth";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Food } from "@prisma/client";
import { paginateFoodItems } from "./actions";
import Link from "next/link";
const InventoryList = ({
  spaceId,
  defaultItems,
}: {
  defaultItems: Food[] | null;
  spaceId: string;
}) => {
  const mediumWidth = useWindowWidth(640);
  const largeWidth = useWindowWidth(1024);
  return (
    <PaginationWrapper
      paginate={async ({ cursor, take }) =>
        await paginateFoodItems({
          cursor: cursor,
          spaceId: spaceId,
          take: take,
        })
      }
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
        <Grid
          container
          rowSpacing={{
            sm: 2,
            md: 3,
            lg: 4,
          }}
          columnSpacing={{
            sm: 2,
            md: 3,
            lg: 4,
          }}
        >
          {props.data.map((item) => (
            <Grid key={item.id} item sm={6} md={4} xl={3}>
              <Link
                className="flex w-full h-full"
                href={`/dashboard/spaces/${spaceId}/${item.id}`}
              >
                <Typography variant="body1">{item.category}</Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </PaginationWrapper>
  );
};

export default InventoryList;
