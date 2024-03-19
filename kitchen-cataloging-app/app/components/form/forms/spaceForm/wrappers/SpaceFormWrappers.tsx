import { TitleProvider } from "@/components/form/inputs/wrapperInputs/title/TitleProvider";
import { Room } from "@prisma/client";
import React from "react";
export default function SpaceFormWrappers({
  itemData,
  children,
}: {
  itemData: Partial<Room> | null;
  children: React.ReactNode;
}) {
  return (
    <TitleProvider defaultValue={itemData?.title}>{children}</TitleProvider>
  );
}
