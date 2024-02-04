"use client";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Box, Button, Typography } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Food } from "@prisma/client";
const ItemStockInfoAndBtns = ({
  item,
  mediumWidth,
  smallWidth,
}: {
  item: Food;
  mediumWidth: boolean;
  smallWidth: boolean;
}) => {
  return (
    <Box className="flex w-full justify-between items-center">
      <Box className="flex items-center rounded-l-32xl rounded-r-lg px-0.5 bg-default-sys-light-tertiary-container min-h-0 min-w-0">
        {mediumWidth && (
          <CheckCircleOutlineOutlinedIcon
            fontSize="small"
            className="p-[0.1rem] m-0 text-default-sys-light-on-tertiary-container"
          />
        )}
        <Typography
          className="font-medium leading-5 sm:leading-6 px-0.5 xs:px-1 break-all sm:pl-0.5 sm:pr-1 text-default-sys-light-on-tertiary-container"
          noWrap
          variant={smallWidth ? "caption" : "overline"}
          sx={{
            textTransform: "none",
          }}
        >
          {item.amount} in stock
        </Typography>
      </Box>
      <Box className="flex space-x-2 xs:space-x-2.5 sm:space-x-3 ml-1.5 xs:ml-2">
        <Button
          aria-label={`add-${item.title}-item`}
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
        <Button
          aria-label={`delete-${item.title}-item`}
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
    </Box>
  );
};
const ItemDescription = ({
  title,
  expirationDate,
  mediumWidth,
}: {
  title: string;
  expirationDate?: Date | null;
  mediumWidth: boolean;
}) => {
  const locale = navigator.language || "en-US";
  const desktopOverflow = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  };
  return (
    <Box className="flex flex-col w-full min-h-0 space-y-1 flex-grow">
      <Typography
        className="font-medium text-3xl sm:text-4xl leading-5 sm:leading-6 text-default-ref-neutral-neutral30"
        variant={"subtitle2"}
        noWrap={!mediumWidth}
        sx={mediumWidth ? desktopOverflow : undefined}
      >
        {title}
      </Typography>
      <Typography
        variant={mediumWidth ? "button" : "caption"}
        noWrap
        className="font-normal leading-4 sm:leading-6 text-default-ref-neutral-neutral50"
        sx={{
          textTransform: "none",
        }}
      >
        Expires on{" "}
        {expirationDate?.toLocaleString(locale, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Typography>
    </Box>
  );
};
const AddToGroceriesBtn = ({ mediumWidth }: { mediumWidth: boolean }) => {
  return (
    <Button
      variant="contained"
      className="rounded-full space-x-0.5 sm:space-x-1 min-h-0 py-2 sm:py-2 lg:py-2.5 bg-default-sys-light-primary"
      sx={{
        boxShadow: "none",
      }}
    >
      <AddShoppingCartOutlinedIcon
        fontSize="small"
        className="p-[0.15rem] sm:p-0"
      />
      <Typography
        noWrap
        variant={mediumWidth ? "button" : "caption"}
        className="lg:text-3xl font-normal tracking-wide text-default-sys-light-on-primary"
        sx={{
          textTransform: "none",
        }}
      >
        Add to Groceries
      </Typography>
    </Button>
  );
};
const ItemContent = ({
  item,
  mediumWidth,
  smallWidth,
}: {
  item: Food;
  mediumWidth: boolean;
  smallWidth: boolean;
}) => {
  return (
    <Box className="flex flex-col w-full space-y-4 xs:space-y-4.5 md:space-y-5 p-2 sm:p-2.5 md:p-3 lg:p-3.5 rounded-t-29xl rounded-b-23xl xs:rounded-t-32xl xs:rounded-b-26xl md:rounded-t-34xl md:rounded-b-28xl bg-default-sys-light-surface-container-lowest">
      <Box className="flex flex-col w-full space-y-3 xs:space-y-3.5 md:space-y-4 flex-grow">
        <ItemStockInfoAndBtns
          item={item}
          mediumWidth={mediumWidth}
          smallWidth={smallWidth}
        />
        <ItemDescription
          expirationDate={item.expirationDate}
          title={item.title}
          mediumWidth={mediumWidth}
        />
      </Box>
      <AddToGroceriesBtn mediumWidth={mediumWidth} />
    </Box>
  );
};
export default ItemContent;
