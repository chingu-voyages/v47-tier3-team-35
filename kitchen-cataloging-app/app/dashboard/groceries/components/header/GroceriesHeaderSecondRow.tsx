"use client";
import React from "react";
import GroceriesHeaderBottomBox from "./wrappers/GroceriesHeaderBottomBox";
import GroceriesSearch from "./GroceriesSearch";
import useWindowWidth from "@/hooks/useWindowWidth";
import AddItemBtn from "@/components/actionBtns/AddItemBtn";
export default function GroceriesHeaderSecondRow() {
  const smallWidth = useWindowWidth(640);
  return (
    <GroceriesHeaderBottomBox>
      <GroceriesSearch />
      {smallWidth && <AddItemBtn />}
    </GroceriesHeaderBottomBox>
  );
}
