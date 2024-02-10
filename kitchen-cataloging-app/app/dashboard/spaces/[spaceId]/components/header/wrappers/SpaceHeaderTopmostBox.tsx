import { Box } from "@mui/material";
import React from "react";

export default function SpaceHeaderTopmostBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex flex-col md:flex-row md:justify-between mb-6 sm:mb-6 lg:mb-7 min-h-0 min-w-0">
      {children}
    </Box>
  );
}
