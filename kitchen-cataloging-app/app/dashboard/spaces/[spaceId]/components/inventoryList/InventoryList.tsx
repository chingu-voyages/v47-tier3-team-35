"use client";
import PaginationWrapper from "@/components/utils/PaginationWrapper";
import { Grid } from "@mui/material";
import { Food } from "@prisma/client";
import { paginateFoodItems } from "../../actions";
import Link from "next/link";
import ItemContent from "./ItemContent";
import { replaceImgKeyWithSignedUrls } from "@/aws/presignUrls/utils/replaceImgKeyWithSignedUrl";
import { InventoryImage } from "./InventoryImage";
import LoadingComponent from "@/components/loading/FullPagePaginationLoadingComponent";
import useWindowWidth from "@/hooks/useWindowWidth";
const paginateInventoryList =
  (spaceId: string) =>
  async ({ cursor, take }: { cursor?: string | null; take: number }) => {
    const nextItems = await paginateFoodItems({
      cursor: cursor,
      spaceId: spaceId,
      take: take,
    });
    if (!nextItems) return nextItems;
    const nextItemsWithUrls = await replaceImgKeyWithSignedUrls({
      items: nextItems,
    });
    //we do this in case presigning url fails. This way we can still read content data,
    //though we can't load the url
    return nextItemsWithUrls || nextItems;
  };

const InventoryList = ({
  spaceId,
  defaultItems,
}: {
  defaultItems: Food[] | null;
  spaceId: string;
}) => {
  const smallWidth = useWindowWidth(400);
  const mediumWidth = useWindowWidth(640);
  return (
    <PaginationWrapper
      paginate={paginateInventoryList(spaceId)}
      take={20}
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
                className="flex w-full h-full"
                href={`/dashboard/spaces/${spaceId}/${item.id}`}
              >
                <InventoryImage image={item.image} />
                <ItemContent
                  item={item}
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
