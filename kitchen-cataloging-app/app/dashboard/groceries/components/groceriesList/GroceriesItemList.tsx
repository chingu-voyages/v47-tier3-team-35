"use client";
import InventoryList from "@/components/inventoryList/InventoryList";
import React from "react";
import { SearchResultGroceries } from "../../types";
import { Box, } from "@mui/material";
import { InventoryImage } from "@/components/inventoryList/InventoryImage";
import GroceriesItemContent from "./GroceriesItemContent";
import { useGroceries } from "../../providers/GroceriesProvider";
import ComingSoonBanner from "@/components/comingSoon/ComingSoonBanner";
const PurchasedPage = () => {
  return <ComingSoonBanner />;
};
const ShoppingPage = () => {
  return (
    <InventoryList<SearchResultGroceries>>
      {(props) => (
        <Box
          className={`flex flex-col w-full h-full ${props.borderRadius.top} ${props.borderRadius.bottom}`}
        >
          <InventoryImage
            image={props.item.image}
            itemName={props.item.title}
            borderRadius={props.borderRadius.top}
          />
          <GroceriesItemContent
            item={props.item}
            bottomBorderRadius={props.borderRadius.bottom}
            //note that these are passed here, because if used inside the content component,
            // we would have ~100+ listeners attached
            //this would cause significant performance issues,
            //so we pass them here instead, since we only need one listener.
            mediumWidth={props.width.medium}
          />
        </Box>
      )}
    </InventoryList>
  );
};
export default function GrocieresItemList() {
  const props = useGroceries();
  if (!props) return <></>;
  if (props.pageType === "shopping") return <ShoppingPage />;
  else if (props.pageType === "purchased") return <PurchasedPage />;
  else return <></>;
}
