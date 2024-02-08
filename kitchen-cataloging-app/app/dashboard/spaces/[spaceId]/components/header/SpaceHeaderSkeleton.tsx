import { Box, Skeleton } from "@mui/material";
import SpaceHeaderBottomBox from "./wrappers/SpaceHeaderBottomBox";
import SpaceHeaderBox from "./wrappers/SpaceHeaderBox";
import SpaceHeaderTopmostBox from "./wrappers/SpaceHeaderTopmostBox";
import SpaceActionBtnsWrapper from "./wrappers/SpaceActionBtnsWrapper";

const SpaceHeaderSkeleton = () => {
  return (
    <SpaceHeaderBox>
      <Skeleton variant="text" className="w-2/6 sm:w-1/6 h-4 md:h-5 xl:h-6" />
      <SpaceHeaderTopmostBox>
        <Skeleton
          variant="rounded"
          className="w-full xs:w-5/6 md:w-7/12 h-12 md:h-14 lg:h-16 xl:h-[4.5rem]"
        />
        <SpaceActionBtnsWrapper>
          <Box className="flex grow space-x-2 md:space-x-4">
            <Skeleton
              variant="rounded"
              className="aspect-square h-10 sm:h-12 md:h-14 lg:h-16"
            />
            <Skeleton
              variant="rounded"
              className="aspect-square h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </Box>
          <Skeleton
            variant="rounded"
            className="w-2/6 sm:w-1/6 h-10 sm:h-12 md:h-0 md:w-0"
          />
        </SpaceActionBtnsWrapper>
      </SpaceHeaderTopmostBox>
      <SpaceHeaderBottomBox disableSpacing>
        <Box className="flex w-full justify-between">
          <Skeleton
            variant="rounded"
            className="w-full h-12 md:w-4/6 md:h-14"
          />
          <Skeleton variant="rounded" className="w-0 h-0 md:w-1/6 md:h-14" />
        </Box>
      </SpaceHeaderBottomBox>
    </SpaceHeaderBox>
  );
};
export default SpaceHeaderSkeleton;
