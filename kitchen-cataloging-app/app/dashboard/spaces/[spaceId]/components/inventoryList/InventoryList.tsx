"use client";
import PaginationWrapper from "@/components/pagination/PaginationWrapper";
import { searchFoodItems } from "../../actions/actions";
import Link from "next/link";
import ItemContent from "./ItemContent";
import { InventoryImage } from "./InventoryImage";
import LoadingComponent from "@/components/pagination/FullPagePaginationLoadingComponent";
import useWindowWidth from "@/hooks/useWindowWidth";
import InventoryListGridWrapper, {
  InventoryListItemGridWrapper,
} from "./wrappers/InventoryListGridWrapper";
import { SearchResultFood } from "../../actions/types/types";
const paginateInventoryList =
  (spaceId: string) =>
  async ({ cursor, take }: { cursor?: string | null; take: number }) => {
    const results = await searchFoodItems({
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
  defaultItems?: SearchResultFood[] | null;
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
        <InventoryListGridWrapper>
          {props.data.map((item) => (
            <InventoryListItemGridWrapper key={item.id}>
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
                  // we would have ~100+ listeners attached
                  //this would cause significant performance issues,
                  //so we pass them here instead, since we only need one listener.
                  mediumWidth={mediumWidth}
                  smallWidth={smallWidth}
                />
              </Link>
            </InventoryListItemGridWrapper>
          ))}
        </InventoryListGridWrapper>
      )}
    </PaginationWrapper>
  );
};

export default InventoryList;
