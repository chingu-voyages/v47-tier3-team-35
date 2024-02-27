import { Box, IconButton } from "@mui/material";
import React, { useCallback } from "react";
import DragDrop from "../innerComponents/dnd/DragDrop";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { v4 as uuid } from "uuid";
import { useTitleInput } from "../wrapperInputs/title/TitleProvider";
import { useDndFileInput } from "../innerComponents/dnd/DnDProvider";
const replaceSpaces = (str: string) => str.replace(/[ ]+/g, '-')
export default function GenerateImgBtn() {
  const titleProps = useTitleInput();
  const dndProps = useDndFileInput();
  const title = titleProps?.title;
  const setDndFile = dndProps?.setDndFile;
  console.log(replaceSpaces(title || ''))
  const srcToFile = async (imgTitle?: string) => {
    if (!imgTitle) return;
    const src = `https://source.unsplash.com/random/800x800/?${replaceSpaces(imgTitle)}`;
    const fileName = uuid();
    const response = await fetch(src);
    const blob = await response.blob();
    const mimeType = response.headers.get("content-type");
    if (mimeType) {
      const file = new File([blob], fileName, { type: mimeType });
      if (setDndFile) setDndFile(file);
    }
  };
  const savedSrcToFile = useCallback(srcToFile, [setDndFile]);
  return (
    <IconButton
      className="p-2 rounded-full bg-default-sys-light-primary pointer-events-auto cursor-pointer"
      onClick={() => savedSrcToFile(title)}
    >
      <AutoAwesomeIcon className="text-default-sys-light-on-primary" />
    </IconButton>
  );
}
export const DndImageInput = ({
  children,
  btnContainerChildren,
}: {
  children?: React.ReactNode;
  btnContainerChildren?: React.ReactNode;
}) => {
  const dndProps = useDndFileInput();
  return (
    <DragDrop
      name={"image"}
      defaultImageUrl={dndProps?.defaultImgUrl}
      btnContainerChildren={btnContainerChildren}
    >
      {children}
    </DragDrop>
  );
};
export const ImageInput = () => {
  return (
    <DndImageInput btnContainerChildren={<GenerateImgBtn />}>
      <Box className=" px-4 py-2 flex items-center gap-4 z-0">
        <AddPhotoAlternateIcon className="h-10 w-10" />
        <Box className="text-sm">
          Drag an image,{" "}
          <FileUploadOutlinedIcon className="text-default-sys-light-primary rounded-full py-1 border border-default-sys-light-primary" />{" "}
          upload, or{" "}
          <AutoAwesomeIcon className="text-default-sys-light-primary rounded-full py-1 border border-default-sys-light-primary" />{" "}
          generate an image.
        </Box>
      </Box>
    </DndImageInput>
  );
};
