import React from "react";
import { useThresholdInput } from "@/components/form/inputs/wrapperInputs/threshold/ThresholdProvider";
import { useExpirationDateInput } from "@/components/form/inputs/wrapperInputs/expirationDate/ExpirationDateProvider";
import { useDndFileInput } from "@/components/form/inputs/innerComponents/dnd/DnDProvider";
import { useLabelsInput } from "@/components/form/inputs/wrapperInputs/labels/LabelsProvider";
import { usePriceInput } from "@/components/form/inputs/wrapperInputs/price/PriceProvider";
import { useDescriptionInput } from "@/components/form/inputs/wrapperInputs/description/DescriptionProvider";
import { useTitleInput } from "@/components/form/inputs/wrapperInputs/title/TitleProvider";
import { useSpaceInput } from "@/components/form/inputs/wrapperInputs/space/SpaceProvider";
import {
  FoodItemVersionZodType,
  FoodItemZodType,
} from "@/zodTypes/FoodItemSchema";
import uploadImages from "@/aws/content/uploadImages";
import { useQuantityInput } from "@/components/form/inputs/wrapperInputs/quantity/QuantityProvider";
import { uploadFoodItemData } from "./actions/FoodFormServerAction";
import {
  FoodItemSuccessResult,
  FormProps,
} from "@/components/form/types/types";
import FormSubmitWrapper from "@/components/form/components/FormSubmitWrapper";
import { Food } from "@prisma/client";
export default function FoodFormSubmitWrapper({
  children,
  onClose,
  fullInputs,
  foodId,
}: Pick<FormProps<Food, FoodItemSuccessResult>, "children" | "onClose"> & {
  foodId?: string;
  fullInputs: boolean;
}) {
  const spaceProps = useSpaceInput();
  const titleProps = useTitleInput();
  const descriptionProps = useDescriptionInput();
  const priceProps = usePriceInput();
  const labelsProps = useLabelsInput();
  const imgProps = useDndFileInput();
  const expirationDateProps = useExpirationDateInput();
  const thresholdProps = useThresholdInput();
  const quantityProps = useQuantityInput();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //required food item props
    if (!spaceProps?.space) return spaceProps?.setError(true);
    if (!titleProps?.title) return titleProps?.setError(true);
    if (!thresholdProps?.threshold) return thresholdProps?.setError(false);
    let foodVersionDoc: FoodItemVersionZodType | null = null;
    //required food item version props
    if (fullInputs) {
      if (typeof priceProps?.price !== "number")
        return priceProps?.setError(true);
      if (!expirationDateProps?.expirationDate)
        return expirationDateProps?.setError(false);
      if (!quantityProps?.quantity) return quantityProps?.setError(true);
      //add values
      foodVersionDoc = {
        price: priceProps.price,
        expirationDate: new Date(expirationDateProps.expirationDate),
        quantity: quantityProps.quantity,
      };
    }
    //upload image if it exists
    const img: FoodItemZodType["image"] = {
      s3ObjKey: imgProps?.defaultObjKey || null,
      url: "",
    };
    if (imgProps?.newFile && imgProps?.dndFile) {
      const result = await uploadImages({ files: [imgProps.dndFile] });
      //successful upload
      if (result.uploaded.length > 1) {
        const resultImg = result.uploaded[0];
        img.s3ObjKey = resultImg.objKey || null;
      }
    }
    const foodDoc: FoodItemZodType = {
      id: foodId,
      title: titleProps.title,
      labels: labelsProps?.labels || [],
      threshold: thresholdProps.threshold,
      roomId: spaceProps.space.value,
      description: descriptionProps?.description || "",
      image: img,
    };
    const result = await uploadFoodItemData({
      newFoodData: foodDoc,
      newFoodItemVer: fullInputs && foodVersionDoc ? foodVersionDoc : undefined,
    });
    //this indicates an error
    if (result.type === "error") return;
    //this indicates a success callback;
    if (onClose) onClose(result);
  };
  return <FormSubmitWrapper onSubmit={onSubmit}>{children}</FormSubmitWrapper>;
}
