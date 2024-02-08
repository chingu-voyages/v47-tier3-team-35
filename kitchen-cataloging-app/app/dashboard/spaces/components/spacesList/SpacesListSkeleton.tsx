import { Grid, Box, Skeleton } from "@mui/material";
import GridLayoutWrapper, {
  GridItemLayoutWrapper,
} from "./wrappers/GridLayoutWrapper";
const SpacesListItemSkeleton = () => {
  return (
    <GridItemLayoutWrapper>
      <Box className="flex flex-col w-full h-full sm:py-4 lg:py-5.5 sm:my-0">
        <Skeleton variant="text" className="w-3/6 sm:w-full h-6 lg:h-7" />
        <Skeleton variant="text" className="w-3/6 sm:w-full h-4 lg:h-5"/>
      </Box>
    </GridItemLayoutWrapper>
  );
};
const SpacesListSkeleton = () => {
  return (
    <GridLayoutWrapper>
      <SpacesListItemSkeleton />
      <SpacesListItemSkeleton />
    </GridLayoutWrapper>
  );
};
export default SpacesListSkeleton;
