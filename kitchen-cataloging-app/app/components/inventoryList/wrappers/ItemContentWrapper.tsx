import React from "react";
import {
  Box,
  Button,
  ButtonProps,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export function ItemCardButton({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="contained"
      className="rounded-full space-x-0.5 sm:space-x-1 min-h-0 py-2 sm:py-2 lg:py-2.5 bg-default-sys-light-primary"
      sx={{
        boxShadow: "none",
      }}
    >
      {children}
      <Typography
        noWrap
        className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-wide text-default-sys-light-on-primary"
        sx={{
          textTransform: "none",
        }}
      >
        {text}
      </Typography>
    </Button>
  );
}
export function ItemCardTitle({
  title,
  mediumWidth,
}: {
  title?: string;
  mediumWidth?: boolean;
}) {
  const desktopOverflow = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  };
  return (
    <Typography
      className="font-medium text-3xl sm:text-4xl leading-5 sm:leading-6 text-default-ref-neutral-neutral30"
      variant={"subtitle2"}
      noWrap={!mediumWidth}
      sx={mediumWidth ? desktopOverflow : undefined}
    >
      {title}
    </Typography>
  );
}
export function ItemCardFirstRowWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex w-full justify-between items-center">{children}</Box>
  );
}
export function ItemCardChip({
  text,
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <Box className="flex items-center rounded-l-32xl rounded-r-lg px-0.5 bg-default-sys-light-tertiary-container min-h-0 min-w-0">
      {children}
      <Typography
        className="text-xl sm:text-2xl font-medium leading-5 sm:leading-6 px-0.5 xs:px-1 break-all sm:pl-0.5 sm:pr-1 text-default-sys-light-on-tertiary-container"
        noWrap
        sx={{
          textTransform: "none",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
export function ItemCardCounterBtns({
  addBtnProps,
  removeBtnProps,
  children,
}: {
  addBtnProps?: ButtonProps;
  removeBtnProps?: ButtonProps;
  children?: React.ReactNode;
}) {
  return (
    <Box className="flex space-x-2 xs:space-x-2.5 sm:space-x-3 ml-1.5 xs:ml-2">
      <Button
        {...addBtnProps}
        variant="contained"
        className="rounded-full aspect-square p-0.5 sm:p-1 bg-default-ref-neutral-neutral90 text-default-ref-neutral-neutral30"
        sx={{
          minHeight: "unset",
          boxShadow: "unset",
          minWidth: "unset",
        }}
      >
        <AddIcon fontSize="small" className="p-[0.15rem] sm:p-[0.05rem]" />
      </Button>
      {children}
      <Button
        {...removeBtnProps}
        variant="contained"
        className="rounded-full aspect-square p-0.5 sm:p-1 bg-default-ref-neutral-neutral90 text-default-ref-neutral-neutral30"
        sx={{
          minHeight: "unset",
          boxShadow: "unset",
          minWidth: "unset",
        }}
      >
        <RemoveIcon fontSize="small" className="p-[0.15rem] sm:p-[0.05rem]" />
      </Button>
    </Box>
  );
}
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
