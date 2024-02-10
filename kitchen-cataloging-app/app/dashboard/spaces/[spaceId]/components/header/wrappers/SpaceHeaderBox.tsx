import { Box } from "@mui/material";
import React from "react";
export default function SpaceHeaderBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex flex-col w-full min-h-0 min-w-0 mt-7 sm:mt-5 lg:mt-8">
      {children}
    </Box>
  );
}
