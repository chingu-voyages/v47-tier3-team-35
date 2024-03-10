import React from "react";
import { useThresholdInput } from "../inputs/wrapperInputs/threshold/ThresholdProvider";
import { useExpirationDateInput } from "../inputs/wrapperInputs/expirationDate/ExpirationDateProvider";
import { useDndFileInput } from "../inputs/innerComponents/dnd/DnDProvider";
import { useLabelsInput } from "../inputs/wrapperInputs/labels/LabelsProvider";
import { usePriceInput } from "../inputs/wrapperInputs/price/PriceProvider";
import { useDescriptionInput } from "../inputs/wrapperInputs/description/DescriptionProvider";
import { useTitleInput } from "../inputs/wrapperInputs/title/TitleProvider";
import { useSpaceInput } from "../inputs/wrapperInputs/space/SpaceProvider";
import {
  FoodItemVersionZodType,
  FoodItemZodType,
} from "@/zodTypes/FoodItemSchema";
import uploadImages from "@/aws/content/uploadImages";
import { useQuantityInput } from "../inputs/wrapperInputs/quantity/QuantityProvider";
import { uploadFoodItemData } from "./actions/CreateEditServerAction";
import { FoodItemSuccessResult } from "../types/types";
import FormSubmitWrapper from "../components/FormSubmitWrapper";
export default function FoodFormSubmitWrapper({
  type,
  children,
  onClose,
}: {
  type: "edit" | "create";
  children: React.ReactNode;
  onClose: (result?: FoodItemSuccessResult) => void;
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
    //required food item version props
    if (typeof priceProps?.price !== "number")
      return priceProps?.setError(true);
    if (!expirationDateProps?.expirationDate)
      return expirationDateProps?.setError(false);
    if (!quantityProps?.quantity) return quantityProps?.setError(true);
    //upload image if it exists
    let img: FoodItemZodType["image"] = {
      s3ObjKey: imgProps?.defaultObjKey || null,
      url: "",
    };
    if (imgProps?.newFile && imgProps?.dndFile) {
      const result = await uploadImages({ files: [imgProps.dndFile] });
      // const success = result.
      //successful upload
      if (result.uploaded.length > 1) {
        const resultImg = result.uploaded[0];
        img.s3ObjKey = resultImg.objKey || null;
      }
    }
    const foodDoc: FoodItemZodType = {
      title: titleProps.title,
      labels: labelsProps?.labels || [],
      threshold: thresholdProps.threshold,
      roomId: spaceProps.space.value,
      description: descriptionProps?.description || "",
      image: img,
    };
    const foodVersionDoc: FoodItemVersionZodType = {
      price: priceProps.price,
      expirationDate: new Date(expirationDateProps.expirationDate),
      quantity: quantityProps.quantity,
    };
    const result = await uploadFoodItemData({
      newFoodData: foodDoc,
      newFoodItemVer: type === "create" ? foodVersionDoc : undefined,
    });
    //this indicates an error
    if (result.type === "error") return;
    //this indicates a success callback;
    onClose(result);
  };
  return <FormSubmitWrapper onSubmit={onSubmit}>{children}</FormSubmitWrapper>;
}
