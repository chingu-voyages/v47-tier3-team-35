import { Box } from "@mui/material";
import React from "react";

export function ItemDescriptionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex flex-col w-full min-h-0 space-y-1 flex-grow">
      {children}
    </Box>
  );
}

export function ItemContentInnerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex flex-col w-full space-y-2.5 xs:space-y-3 md:space-y-3.5 flex-grow">
      {children}
    </Box>
  );
}

export default function ItemContentWrapper({
  children,
  bottomBorderRadius,
}: {
  bottomBorderRadius?: string;
  children: React.ReactNode;
}) {
  const spacing =
    "-mt-5 xs:-mt-6 md:-mt-7 lg:-mt-8 space-y-3.5 xs:space-y-4 md:space-y-4.5 p-2 sm:p-2.5 md:p-3 lg:p-3.5";
  const borderRadius = `rounded-t-29xl xs:rounded-t-32xl md:rounded-t-38xl ${bottomBorderRadius}`;

  return (
    <Box
      className={`relative z-10 flex flex-col w-full flex-grow bg-default-sys-light-surface-container-lowest ${spacing} ${borderRadius}`}
    >
      {children}
    </Box>
  );
}
