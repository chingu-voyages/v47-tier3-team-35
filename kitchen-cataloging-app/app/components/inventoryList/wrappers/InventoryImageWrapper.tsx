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
    <Box
      className="relative flex w-full max-h-48 aspect-[16/10] xs:aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/10]"
      style={{ borderRadius: "inherit" }}
    >
      <Box
        style={{ borderRadius: "inherit" }}
        className={`absolute z-10 top-0 left-0 w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.20)_15.95%,rgba(0,0,0,0)_100%,rgba(0,0,0,0)_100%)] ${borderRadius}`}
      />
      <Box className={`relative w-full h-full ${borderRadius}`}>{children}</Box>
    </Box>
  );
}
