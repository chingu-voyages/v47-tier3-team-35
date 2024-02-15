import { Box } from "@mui/material";
import React from "react";

export default function GroceriesHeaderTopBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex items-center mb-7 sm:mb-9 lg:mb-11 border-b border-default-ref-neutral-neutral80">
      {children}
    </Box>
  );
}
