"use client";
import PaginationWrapper from "@/components/utils/PaginationWrapper";
import useWindowWidth from "@/hooks/useWindowWidth";
import { Box, CircularProgress, Grid } from "@mui/material";
import { Food } from "@prisma/client";
import { paginateFoodItems } from "../../actions";
import Link from "next/link";
import ItemContent from "./ItemContent";
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
        <Box className="flex justify-center w-full p-6 sm:p-10 lg:p-14">
          <CircularProgress
            size={largeWidth ? "3.5rem" : mediumWidth ? "3rem" : "2.5rem"}
            ref={ref}
          />
        </Box>
      )}
    >
      {(props) => (
        <Grid
          container
          rowSpacing={{
            xs: 1.5,
            sm: 3,
            md: 3,
            lg: 4,
          }}
          columnSpacing={{
            xs: 1.5,
            sm: 3,
            md: 3,
            lg: 4,
          }}
        >
          {props.data.map((item) => (
            <Grid key={item.id} item sm={6} md={4} lg={3} xl={2.4}>
              <Link
                className="flex w-full h-full"
                href={`/dashboard/spaces/${spaceId}/${item.id}`}
              >
                <ItemContent item={item} mediumWidth={mediumWidth} />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </PaginationWrapper>
  );
};

export default InventoryList;
