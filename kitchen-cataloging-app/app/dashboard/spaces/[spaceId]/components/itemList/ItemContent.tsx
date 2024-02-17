"use client";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Typography } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ItemContentWrapper, {
  ItemContentInnerWrapper,
  ItemDescriptionWrapper,
  ItemCardButton,
  ItemCardTitle,
  ItemCardChip,
  ItemCardFirstRowWrapper,
  ItemCardCounterBtns,
} from "@/components/inventoryList/wrappers/ItemContentWrapper";
import { SearchResultFood } from "../../../../../actions/food/types/types";
const ItemStockInfoAndBtns = ({
  item,
  mediumWidth,
}: {
  item: SearchResultFood;
  mediumWidth: boolean;
}) => {
  return (
    <ItemCardFirstRowWrapper>
      <ItemCardChip text={`${item.amount} in stock`}>
        {mediumWidth && (
          <CheckCircleOutlineOutlinedIcon
            fontSize="small"
            className="p-[0.1rem] m-0 text-default-sys-light-on-tertiary-container"
          />
        )}
      </ItemCardChip>
      <ItemCardCounterBtns
        addBtnProps={{ "aria-label": `add-${item.title}-item` }}
        removeBtnProps={{ "aria-label": `remove-${item.title}-item` }}
      />
    </ItemCardFirstRowWrapper>
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

  return (
    <ItemDescriptionWrapper>
      <ItemCardTitle title={title} mediumWidth={mediumWidth} />
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
    </ItemDescriptionWrapper>
  );
};
const AddToGroceriesBtn = () => {
  return (
    <ItemCardButton text={"Add to Groceries"}>
      <AddShoppingCartOutlinedIcon
        fontSize="small"
        className="p-[0.15rem] sm:p-0"
      />
    </ItemCardButton>
  );
};
const ItemContent = ({
  item,
  mediumWidth,
  bottomBorderRadius,
}: {
  item: SearchResultFood;
  mediumWidth: boolean;
  bottomBorderRadius?: string;
}) => {
  return (
    <ItemContentWrapper bottomBorderRadius={bottomBorderRadius}>
      <ItemContentInnerWrapper>
        <ItemStockInfoAndBtns item={item} mediumWidth={mediumWidth} />
        <ItemDescription
          expirationDate={item.expirationDate}
          title={item.title}
          mediumWidth={mediumWidth}
        />
      </ItemContentInnerWrapper>
      <AddToGroceriesBtn />
    </ItemContentWrapper>
  );
};
export default ItemContent;
