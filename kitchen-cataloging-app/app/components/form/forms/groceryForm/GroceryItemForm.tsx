import React from "react";
import { useDndFileInput } from "@/components/form/inputs/innerComponents/dnd/DnDProvider";
import { useLabelsInput } from "@/components/form/inputs/wrapperInputs/labels/LabelsProvider";
import { useDescriptionInput } from "@/components/form/inputs/wrapperInputs/description/DescriptionProvider";
import { useTitleInput } from "@/components/form/inputs/wrapperInputs/title/TitleProvider";
import { useSpaceInput } from "@/components/form/inputs/wrapperInputs/space/SpaceProvider";
import { useQuantityInput } from "@/components/form/inputs/wrapperInputs/quantity/QuantityProvider";
import FormSubmitWrapper from "@/components/form/components/FormSubmitWrapper";
import uploadImages from "@/aws/content/uploadImages";
import { FormProps } from "../../types/types";
import { GroceryItem } from "@prisma/client";
import {
  GroceryItemZodType,
  GroceryItemZodTypeAllOptional,
} from "@/zodTypes/GroceryItemSchema";
import {
  GroceryItemCreateResult,
  GroceryItemUpdateResult,
} from "@/actions/groceries/types/types";
import { uploadGroceryItemForm } from "./actions/GroceryFromServerAction";
export default function GroceryItemForm({
  groceryItemId,
  children,
  onClose,
}: Pick<
  FormProps<GroceryItem, GroceryItemCreateResult | GroceryItemUpdateResult>,
  "children" | "onClose"
> & { groceryItemId?: string }) {
  const spaceProps = useSpaceInput();
  const titleProps = useTitleInput();
  const descriptionProps = useDescriptionInput();
  const labelsProps = useLabelsInput();
  const imgProps = useDndFileInput();
  const quantityProps = useQuantityInput();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //required grocery item props
    if (!spaceProps?.space) return spaceProps?.setError(true);
    if (!titleProps?.title) return titleProps?.setError(true);
    if (!quantityProps?.quantity) return quantityProps?.setError(true);
    //upload image if it exists
    const img: GroceryItemZodType["image"] = {
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
    const groceryDoc: GroceryItemZodTypeAllOptional = {
      id: groceryItemId,
      amount: quantityProps.quantity,
      title: titleProps.title,
      labels: labelsProps?.labels,
      roomId: spaceProps.space.value,
      description: descriptionProps?.description,
      image: img,
    };
    const result = await uploadGroceryItemForm({
      newGroceryItemData: groceryDoc,
    });
    //this indicates an error
    if (result.type === "error") return;
    //this indicates a success callback;
    if (onClose) onClose(result);
  };
  return (
    <FormSubmitWrapper onSubmit={onSubmit}> {children} </FormSubmitWrapper>
  );
}
