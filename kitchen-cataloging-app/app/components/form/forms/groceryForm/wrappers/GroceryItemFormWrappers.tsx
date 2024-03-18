import { DndFileProvider } from "@/components/form/inputs/innerComponents/dnd/DnDProvider";
import { DescriptionProvider } from "@/components/form/inputs/wrapperInputs/description/DescriptionProvider";
import { LabelsProvider } from "@/components/form/inputs/wrapperInputs/labels/LabelsProvider";
import { QuantityProvider } from "@/components/form/inputs/wrapperInputs/quantity/QuantityProvider";
import { SpaceProvider } from "@/components/form/inputs/wrapperInputs/space/SpaceProvider";
import { TitleProvider } from "@/components/form/inputs/wrapperInputs/title/TitleProvider";
import { GroceryItem } from "@prisma/client";
import React from "react";

export default function GroceryItemFormWrappers({
  itemData,
  children,
}: {
  itemData: GroceryItem | null;
  children: React.ReactNode;
}) {
  const spaceValue =
    itemData && itemData.roomId
      ? {
          label: itemData.roomTitle,
          value: itemData.roomId,
        }
      : null;
  return (
    <SpaceProvider defaultValue={spaceValue}>
      <TitleProvider defaultValue={itemData?.title}>
        <DescriptionProvider defaultValue={itemData?.description}>
          <LabelsProvider defaultValue={itemData?.labels}>
            <DndFileProvider defaultValue={itemData?.image?.url}>
              <QuantityProvider defaultValue={itemData?.amount}>
                {children}
              </QuantityProvider>
            </DndFileProvider>
          </LabelsProvider>
        </DescriptionProvider>
      </TitleProvider>
    </SpaceProvider>
  );
}
