import { Box } from "@mui/material";
import React from "react";

export default function SpaceActionBtnsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="w-full flex flex-row items-center mt-3 md:w-auto md:mt-0">
      {children}
    </Box>
  );
}
