import { Box } from "@mui/material";
import React from "react";

export default function NavigationDepthBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex flex-col pt-0 sm:pt-7 lg:pt-12">
      <Box className={"flex flex-row items-center sm:space-x-2.5 lg:space-x-4"}>
        {children}
      </Box>
    </Box>
  );
}
