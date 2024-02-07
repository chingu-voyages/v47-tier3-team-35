import { Skeleton } from "@mui/material";
const SpacesHeaderSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      className="flex flex-col mt-5 sm:mt-4 lg:mt-6 mb-4 sm:mb-6 lg:mb-9 h-11 sm:h-12 w-48"
    />
  );
};
export default SpacesHeaderSkeleton;
