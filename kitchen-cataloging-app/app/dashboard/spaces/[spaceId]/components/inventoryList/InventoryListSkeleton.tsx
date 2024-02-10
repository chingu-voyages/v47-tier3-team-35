import { Box, Skeleton } from "@mui/material";
import InventoryImageWrapper from "./wrappers/InventoryImageWrapper";
import InventoryListGridWrapper, {
  InventoryListItemGridWrapper,
} from "./wrappers/InventoryListGridWrapper";
import ItemContentWrapper, {
  ItemContentInnerWrapper,
} from "./wrappers/ItemContentWrapper";
const InventoryListItemSkeleton = () => {
  const cardTopBorderRadius =
    "rounded-t-23xl xs:rounded-t-26xl md:rounded-t-28xl";
  const cardBottomBorderRadius =
    "rounded-b-23xl xs:rounded-b-26xl md:rounded-b-28xl";
  return (
    <InventoryListItemGridWrapper>
      <InventoryImageWrapper borderRadius={cardTopBorderRadius}>
        <Skeleton
          variant="rounded"
          className={`h-full w-full ${cardTopBorderRadius}`}
        />
      </InventoryImageWrapper>
      <ItemContentWrapper bottomBorderRadius={cardBottomBorderRadius}>
        <ItemContentInnerWrapper>
          <Box className="flex w-full justify-between">
            <Skeleton variant="rounded" className="h-6 w-2/6 sm:h-7" />
            <Box className="flex w-3/6 xs:w-2/6 justify-between">
              <Skeleton variant="rounded" className="h-6 w-5/12 sm:h-7" />
              <Skeleton variant="rounded" className="h-6 w-5/12 sm:h-7" />
            </Box>
          </Box>
          <Skeleton variant="rounded" className="h-5 sm:h-6" />
          <Skeleton variant="rounded" className="h-3.5 sm:h-4 w-1/2" />
        </ItemContentInnerWrapper>
        <Skeleton variant="rounded" className="h-9 sm:h-10 md:h-12" />
      </ItemContentWrapper>
    </InventoryListItemGridWrapper>
  );
};
const InventoryListSkeleton = () => {
  return (
    <InventoryListGridWrapper>
      <InventoryListItemSkeleton />
      <InventoryListItemSkeleton />
      <InventoryListItemSkeleton />
      <InventoryListItemSkeleton />
      <InventoryListItemSkeleton />
      <InventoryListItemSkeleton />
      <InventoryListItemSkeleton />
      <InventoryListItemSkeleton />
    </InventoryListGridWrapper>
  );
};
export default InventoryListSkeleton;
