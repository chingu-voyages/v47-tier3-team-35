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
export default function FormSubmitWrapper({
  type,
  children,
}: {
  type: "edit" | "create";
  children: React.ReactNode;
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
    if (!spaceProps?.space) return spaceProps?.setError(true);
    if (!titleProps?.title) return titleProps?.setError(true);
    if (typeof priceProps?.price !== "number")
      return descriptionProps?.setError(true);
    if (!thresholdProps?.threshold) return thresholdProps?.setError(false);
    //required food item version props
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
  };
  // submit form
  // const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   console.log("submitting");
  //   if (
  //     titleRef.current &&
  //     priceRef.current &&
  //     descriptionRef.current &&
  //     expirationDateRef.current
  //   ) {
  //     console.log("all refs exist");
  //     const errorObject = {
  //       space: space === "" ? true : false,
  //       title: titleRef.current.value === "",
  //       price:
  //         priceRef.current.value === "" ||
  //         Math.abs(
  //           Math.round(parseFloat(priceRef.current.value) * 100) -
  //             parseFloat(priceRef.current.value) * 100
  //         ) > computersAreDumb
  //           ? true
  //           : false,
  //       description: descriptionRef.current.value === "" ? true : false,
  //     };
  //     setErrors(errorObject);
  //     if (Object.values(errorObject).every((err) => err === false)) {
  //       console.log("no errors");
  //       await addEditItem(
  //         space,
  //         titleRef.current.value,
  //         image,
  //         priceRef.current.value,
  //         descriptionRef.current.value,
  //         threshold,
  //         labels,
  //         expirationDateRef.current.value,
  //         userId,
  //         itemData
  //       );
  //       window.location.reload();
  //     }
  //   }
  // };
  return (
    <form
      className="relative flex flex-col bg-default-sys-light-surface-container-low w-full h-full"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
