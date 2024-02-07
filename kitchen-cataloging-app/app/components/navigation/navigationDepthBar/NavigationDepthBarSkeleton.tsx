import { Skeleton } from "@mui/material";

export const NavigationDepthBarSkeleton = () => {
  return (
    <Skeleton
      variant="text"
      className="flex flex-col mt-0 sm:mt-7 lg:mt-12 sm:h-7 xl:h-9 sm:w-3/6 w-0 h-0"
    />
  );
};
