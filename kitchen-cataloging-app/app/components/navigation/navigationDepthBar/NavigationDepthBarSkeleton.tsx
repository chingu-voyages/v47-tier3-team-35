import { Skeleton } from "@mui/material";

export const NavigationDepthBarSkeleton = () => {
  return (
    <Skeleton
          variant="text"
      className="flex flex-col mt-6 sm:mt-7 lg:mt-12 h-7 xl:h-9 w-3/6"
    />
  );
};
