import React from "react";
import FormSubmitWrapper from "@/components/form/components/FormSubmitWrapper";
import { FormProps } from "../../../types/types";
import { Room } from "@prisma/client";
import { useTitleInput } from "@/components/form/inputs/wrapperInputs/title/TitleProvider";
import { uploadRoomData } from "../actions/UploadRoomData";
import { SpaceSuccessResult } from "@/actions/space/types/types";
export default function SpaceSubmitFormWrapper({
  spaceId,
  children,
  onClose,
}: Pick<
  FormProps<Room, SpaceSuccessResult>,
  "children" | "onClose"
> & { spaceId?: string }) {
  const title = useTitleInput();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //required grocery item props
    if (!title?.title) return title?.setError(true);
    //upload
    const result = await uploadRoomData({
      roomData: { id: spaceId, title: title.title },
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
