import { Box } from "@mui/material";
import React from "react";

export default function SpacesHeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex flex-col w-full pb-4 mt-5 sm:pb-6 lg:pb-9 sm:mt-4 lg:mt-6 lg:mb-0">
      {children}
    </Box>
  );
}
