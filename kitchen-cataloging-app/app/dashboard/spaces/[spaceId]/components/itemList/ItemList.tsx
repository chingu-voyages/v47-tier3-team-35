"use client";
import { InventoryImage } from "@/components/inventoryList/InventoryImage";
import InventoryList from "@/components/inventoryList/InventoryList";
import Link from "next/link";
import React from "react";
import ItemContent from "./ItemContent";
import { SearchResultFood } from "../../actions/types/types";
export default function ItemList({
  defaultItems,
  spaceId,
}: {
  defaultItems?: SearchResultFood[] | null;
  spaceId: string;
}) {
  return (
    <InventoryList defaultItems={defaultItems}>
      {(props) => (
        <Link
          className={`flex flex-col w-full h-full ${props.borderRadius.top} ${props.borderRadius.bottom}`}
          href={`/dashboard/spaces/${spaceId}/${props.item.id}`}
        >
          <InventoryImage
            image={props.item.image}
            itemName={props.item.title}
            borderRadius={props.borderRadius.top}
          />
          <ItemContent
            item={props.item}
            bottomBorderRadius={props.borderRadius.bottom}
            //note that these are passed here, because if used inside the content component,
            // we would have ~100+ listeners attached
            //this would cause significant performance issues,
            //so we pass them here instead, since we only need one listener.
            mediumWidth={props.width.medium}
          />
        </Link>
      )}
    </InventoryList>
  );
}
