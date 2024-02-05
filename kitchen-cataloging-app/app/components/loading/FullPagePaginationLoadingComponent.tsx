"use client";
import useWindowWidth from "@/hooks/useWindowWidth";
import { Box, CircularProgress } from "@mui/material";
export const FullPagePaginationLoadingComponent = ({
  setRef,
}: {
  setRef: (node?: Element | null | undefined) => void;
}) => {
  const mediumWidth = useWindowWidth(640);
  const largeWidth = useWindowWidth(1024);
  return (
    <Box className="flex justify-center w-full p-6 sm:p-10 lg:p-14">
      <CircularProgress
        size={largeWidth ? "3.5rem" : mediumWidth ? "3rem" : "2.5rem"}
        ref={setRef}
      />
    </Box>
  );
};
export default FullPagePaginationLoadingComponent;
