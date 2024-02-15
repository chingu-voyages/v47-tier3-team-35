import { Box } from "@mui/material";
import React from "react";

export default function GroceriesHeaderBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex flex-col w-full min-h-0 min-w-0 mt-4 sm:mt-2.5 lg:mt-3">
      {children}
    </Box>
  );
}
