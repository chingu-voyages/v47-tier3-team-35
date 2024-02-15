import React from "react";
import GroceriesHeaderBox from "./wrappers/GroceriesHeaderBox";
import GroceriesHeaderFirstRow from "./GroceriesHeaderFirstRow";
import GroceriesHeaderSecondRow from "./GroceriesHeaderSecondRow";
export default function GroceriesHeader() {
  return (
    <GroceriesHeaderBox>
      <GroceriesHeaderFirstRow />
      <GroceriesHeaderSecondRow />
    </GroceriesHeaderBox>
  );
}
