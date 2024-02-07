"use client";
import PaginationWrapper from "@/components/pagination/PaginationWrapper";
import { Grid } from "@mui/material";
import { Food } from "@prisma/client";
import { paginateFoodItems } from "../../actions";
import Link from "next/link";
import ItemContent from "./ItemContent";
import { InventoryImage } from "./InventoryImage";
import LoadingComponent from "@/components/loading/FullPagePaginationLoadingComponent";
import useWindowWidth from "@/hooks/useWindowWidth";

const paginateInventoryList =
  (spaceId: string) =>
  async ({ cursor, take }: { cursor?: string | null; take: number }) => {
    const results = await paginateFoodItems({
      cursor: cursor,
      spaceId: spaceId,
      take: take,
    });
    return results;
  };

const InventoryList = ({
  spaceId,
  defaultItems,
}: {
  defaultItems?: Food[] | null;
  spaceId: string;
}) => {
  const smallWidth = useWindowWidth(400);
  const mediumWidth = useWindowWidth(640);
  const cardTopBorderRadius =
    "rounded-t-23xl xs:rounded-t-26xl md:rounded-t-28xl";
  const cardBottomBorderRadius =
    "rounded-b-23xl xs:rounded-b-26xl md:rounded-b-28xl";
  return (
    <PaginationWrapper
      paginate={paginateInventoryList(spaceId)}
      take={10}
      defaultItems={defaultItems}
      loadingComponent={(ref) => <LoadingComponent setRef={ref} />}
    >
      {(props) => (
        <Grid
          container
          rowSpacing={{
            xxs: 1.2,
            xs: 1.5,
            sm: 3,
            md: 3,
            lg: 4,
          }}
          columnSpacing={{
            xxs: 1.2,
            xs: 1.5,
            sm: 3,
            md: 3,
            lg: 4,
          }}
        >
          {props.data.map((item) => (
            <Grid key={item.id} item xxs={6} md={4} lg={3} xl={2.4}>
              <Link
                className={`flex flex-col w-full h-full ${cardTopBorderRadius} ${cardBottomBorderRadius}`}
                href={`/dashboard/spaces/${spaceId}/${item.id}`}
              >
                <InventoryImage
                  image={item.image}
                  itemName={item.title}
                  borderRadius={cardTopBorderRadius}
                />
                <ItemContent
                  item={item}
                  bottomBorderRadius={cardBottomBorderRadius}
                  //note that these are passed here, because if used inside the content component,
                  // we would have ~1000+ listeners attached
                  //this would cause significant performance issues,
                  //so we pass them here instead, since we only need one listener.
                  mediumWidth={mediumWidth}
                  smallWidth={smallWidth}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </PaginationWrapper>
  );
};

export default InventoryList;
