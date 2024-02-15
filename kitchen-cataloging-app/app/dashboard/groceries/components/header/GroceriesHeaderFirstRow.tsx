"use client";
import React from "react";
import GroceriesHeaderTopBox from "./wrappers/GroceriesHeaderTopBox";
import GroceriesHeaderTabs from "./GroceriesHeaderTabs";
import useWindowWidth from "@/hooks/useWindowWidth";
import AddItemBtn from "@/components/UI/AddItemBtn";
export default function GroceriesHeaderFirstRow() {
  const smallWidth = useWindowWidth(640);
  return (
    <GroceriesHeaderTopBox>
      <GroceriesHeaderTabs />
      {!smallWidth && <AddItemBtn />}
    </GroceriesHeaderTopBox>
  );
}
