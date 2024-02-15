"use client";
import InventoryList from "@/components/inventoryList/InventoryList";
import React from "react";
import { SearchResultGroceries } from "../../types";
import { Box } from "@mui/material";
import { InventoryImage } from "@/components/inventoryList/InventoryImage";
import GroceriesItemContent from "./GroceriesItemContent";
export default function GrocieresItemList() {
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
}
