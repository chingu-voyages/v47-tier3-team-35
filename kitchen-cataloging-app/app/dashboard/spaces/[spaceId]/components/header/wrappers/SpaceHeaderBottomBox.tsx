import { Box } from "@mui/material";
import React from "react";
export default function SpaceHeaderBottomBox({
  children,
  disableSpacing = false,
}: {
  children: React.ReactNode;
  disableSpacing?: boolean;
}) {
  const spacing = "space-x-12";
  return (
    <Box
      className={`flex items-center w-full mb-7 sm:mb-9 lg:mb-11 ${
        !disableSpacing ? spacing : ""
      }`}
    >
      {children}
    </Box>
  );
}
