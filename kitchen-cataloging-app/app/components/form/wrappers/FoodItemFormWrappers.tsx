import { FoodType } from "@/prisma/mock/mockData";
import React from "react";
import { LabelsProvider } from "../inputs/wrapperInputs/labels/LabelsProvider";
import { SpaceProvider } from "../inputs/wrapperInputs/space/SpaceProvider";
import { DndFileProvider } from "../inputs/innerComponents/dnd/DnDProvider";
import { ThresholdProvider } from "../inputs/wrapperInputs/threshold/ThresholdProvider";
import { DescriptionProvider } from "../inputs/wrapperInputs/description/DescriptionProvider";
import { TitleProvider } from "../inputs/wrapperInputs/title/TitleProvider";
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
