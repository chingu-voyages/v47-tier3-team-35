import React from "react";
import ItemContentWrapper, {
  ItemCardButton,
  ItemCardChip,
  ItemCardCounterBtns,
  ItemCardFirstRowWrapper,
  ItemCardTitle,
  ItemContentInnerWrapper,
  ItemDescriptionWrapper,
} from "@/components/inventoryList/wrappers/ItemContentWrapper";
import { SearchResultGroceries } from "../../types";
import CheckIcon from "@mui/icons-material/Check";
const PurchasedBtn = () => {
  return (
    <ItemCardButton text="Purchased">
      <CheckIcon fontSize="small" className="p-[0.15rem] sm:p-0" />
    </ItemCardButton>
  );
};
const ItemInfoAndBtns = ({ item }: { item: SearchResultGroceries }) => {
  return (
    <ItemCardFirstRowWrapper>
      <ItemCardChip text={`${item.roomTitle}`} />
      <ItemCardCounterBtns
        addBtnProps={{ "aria-label": `add-${item.title}-item` }}
        removeBtnProps={{ "aria-label": `remove-${item.title}-item` }}
      />
    </ItemCardFirstRowWrapper>
  );
};
const ItemDescription = ({
  title,
  mediumWidth,
}: {
  title: string;
  mediumWidth: boolean;
}) => {
  return (
    <ItemDescriptionWrapper>
      <ItemCardTitle title={title} mediumWidth={mediumWidth} />
    </ItemDescriptionWrapper>
  );
};
export default function GroceriesItemContent({
  item,
  mediumWidth,
  bottomBorderRadius,
}: {
  item: SearchResultGroceries;
  mediumWidth: boolean;
  bottomBorderRadius?: string;
}) {
  return (
    <ItemContentWrapper bottomBorderRadius={bottomBorderRadius}>
      <ItemContentInnerWrapper>
        <ItemInfoAndBtns item={item} />
        <ItemDescription title={item.title} mediumWidth={mediumWidth} />
      </ItemContentInnerWrapper>
      <PurchasedBtn />
    </ItemContentWrapper>
  );
}
