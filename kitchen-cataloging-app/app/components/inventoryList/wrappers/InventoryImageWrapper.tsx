import { Box } from "@mui/material";
import React from "react";
export default function InventoryImageWrapper({
  children,
  borderRadius,
}: {
  children: React.ReactNode;
  borderRadius?: string;
}) {
  return (
    <Box className="flex w-full max-h-48 aspect-[16/10] xs:aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/10]">
      <Box className={`relative w-full h-full ${borderRadius}`}>{children}</Box>
    </Box>
  );
}
