import { Grid, Box, Skeleton } from "@mui/material";
const SpacesListItemSkeleton = () => {
  return (
    <Grid item xxs={12} sm={6} md={4} xl={3}>
      <Box className="flex flex-col w-full h-full sm:py-2.5 lg:py-5 my-2.5 sm:my-0">
        <Skeleton variant="text" className="w-3/6 sm:w-full"/>
        <Skeleton variant="text" className="w-3/6 sm:w-full"/>
      </Box>
    </Grid>
  );
};
const SpacesListSkeleton = () => {
  return (
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
      <SpacesListItemSkeleton />
      <SpacesListItemSkeleton />
    </Grid>
  );
};
export default SpacesListSkeleton;
