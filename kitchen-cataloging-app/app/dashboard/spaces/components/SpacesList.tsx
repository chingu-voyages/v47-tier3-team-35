"use client";
import { Room } from "@prisma/client";
import { useState } from "react";
const SpaceList = ({ defaultItems }: { defaultItems: Room[] | null }) => {
  const [items, setItems] = useState(defaultItems);
  
  return <div></div>;
};
export default SpaceList;
