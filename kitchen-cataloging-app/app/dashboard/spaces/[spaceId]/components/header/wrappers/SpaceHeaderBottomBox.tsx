import { Box } from "@mui/material";
import React from "react";
export default function SpaceHeaderBottomBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex items-center w-full mb-7 sm:mb-9 lg:mb-11 space-x-12">
      {children}
    </Box>
  );
}
