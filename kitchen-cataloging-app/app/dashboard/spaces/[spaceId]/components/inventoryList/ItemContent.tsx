"use client";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Box, Button, Chip, Typography } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Food } from "@prisma/client";
const ItemStockInfoAndBtns = ({ item }: { item: Food }) => {
  return (
    <Box>
      <Chip
        icon={
          <CheckCircleOutlineOutlinedIcon
            fontSize="small"
            className="p-[0.1rem] m-0 text-default-sys-light-on-tertiary-container"
          />
        }
        label={`${item.amount} in stock`}
        className="font-medium items-center text-2xl rounded-r-lg p-0.5 [&>.MuiChip-label]:pl-0.5 [&>.MuiChip-label]:pr-2 bg-default-sys-light-tertiary-container text-default-sys-light-on-tertiary-container"
        sx={{
          width: "fit-content",
          height: "auto",
        }}
      />
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
    <Box className="flex flex-col w-full min-h-0 space-y-1">
      <Typography
        className="font-medium leading-6 text-5xl text-default-ref-neutral-neutral30 break-all"
        variant="subtitle2"
        noWrap={!mediumWidth}
        sx={mediumWidth ? desktopOverflow : undefined}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        noWrap
        className="font-normal leading-5 text-default-ref-neutral-neutral50"
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
const AddToGroceriesBtn = () => {
  return (
    <Button
      variant="contained"
      className="rounded-32xl space-x-1 min-h-0 bg-default-sys-light-primary "
      sx={{
        boxShadow: "none",
      }}
    >
      <AddShoppingCartOutlinedIcon fontSize="small" />
      <Typography
        noWrap
        variant="button"
        className="font-normal  tracking-wide text-3xl text-default-sys-light-on-primary"
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
}: {
  item: Food;
  mediumWidth: boolean;
}) => {
  return (
    <Box className="flex flex-col w-full space-y-5 p-1.5 sm:p-2 md:p-3 lg:p-3.5 rounded-t-34xl rounded-b-28xl bg-default-sys-light-surface-container-lowest">
      <Box className="flex flex-col w-full space-y-4">
        <ItemStockInfoAndBtns item={item} />
        <ItemDescription
          expirationDate={item.expirationDate}
          title={item.category}
          mediumWidth={mediumWidth}
        />
      </Box>
      <AddToGroceriesBtn />
    </Box>
  );
};
export default ItemContent;
