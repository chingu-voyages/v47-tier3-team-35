import { FoodType } from "@/prisma/mock/mockData";
import React from "react";
import { LabelsProvider } from "@/components/form/inputs/wrapperInputs/labels/LabelsProvider";
import { SpaceProvider } from "@/components/form/inputs/wrapperInputs/space/SpaceProvider";
import { DndFileProvider } from "@/components/form/inputs/innerComponents/dnd/DnDProvider";
import { ThresholdProvider } from "@/components/form/inputs/wrapperInputs/threshold/ThresholdProvider";
import { DescriptionProvider } from "@/components/form/inputs/wrapperInputs/description/DescriptionProvider";
import { TitleProvider } from "@/components/form/inputs/wrapperInputs/title/TitleProvider";
export default function FoodItemFormWrappers({
  itemData,
  children,
}: {
  itemData: FoodType | null;
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
              <ThresholdProvider defaultValue={itemData?.threshold}>
                {children}
              </ThresholdProvider>
            </DndFileProvider>
          </LabelsProvider>
        </DescriptionProvider>
      </TitleProvider>
    </SpaceProvider>
  );
}
