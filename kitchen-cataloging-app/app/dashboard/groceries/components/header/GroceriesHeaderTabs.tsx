"use client";
import React from "react";
import { Tab, Tabs } from "@mui/material";
import { PageTypeProps, useGroceries } from "../../providers/GroceriesProvider";
const tabStyles = (active: PageTypeProps, currVal: PageTypeProps) => ({
  className: `${
    active !== currVal ? "text-default-ref-neutral-neutral50" : ""
  } first:px-0 flex py-0 items-center px-3 lg:px-3.5 xl:px-4 text-3xl xs:text-4xl xl:text-5xl min-h-14 xs:min-h-14 lg:min-h-16 xl:min-h-18`,
  sx: {
    textTransform: "none",
  },
});
export default function GroceriesHeaderTabs() {
  const groceryState = useGroceries();
  if (!groceryState) return <></>;
  const { pageType, setPageType } = groceryState;
  return (
    <Tabs
      value={pageType}
      className="min-h-14 xs:min-h-14 lg:min-h-16 xl:min-h-18 grow"
      onChange={(e, newValue) =>
        setPageType(newValue === "shopping" ? "shopping" : "purchased")
      }
    >
      <Tab
        label="Grocery Cart"
        value={"shopping"}
        {...tabStyles(pageType, "shopping")}
      />
      <Tab
        label="Purchased"
        value={"purchased"}
        {...tabStyles(pageType, "purchased")}
      />
    </Tabs>
  );
}
