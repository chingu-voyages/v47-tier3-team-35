import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useCallback } from "react";
import DragDrop from "../innerComponents/dnd/DragDrop";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { v4 as uuid } from "uuid";
import { useTitleInput } from "../wrapperInputs/title/TitleProvider";
import { useDndFileInput } from "../innerComponents/dnd/DnDProvider";
const replaceSpaces = (str: string) => str.replace(/[ ]+/g, "-");
export default function GenerateImgBtn({
  type = "icon",
}: {
  type?: "text" | "icon";
}) {
  const titleProps = useTitleInput();
  const dndProps = useDndFileInput();
  const title = titleProps?.title;
  const setDndFile = dndProps?.setDndFile;
  console.log(replaceSpaces(title || ""));
  const srcToFile = async (imgTitle?: string) => {
    if (!imgTitle) return;
    const src = `https://source.unsplash.com/random/800x800/?${replaceSpaces(
      imgTitle
    )}`;
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
  if (type === "icon")
    return (
      <IconButton
        className="p-2 rounded-full bg-default-sys-light-primary pointer-events-auto cursor-pointer"
        onClick={() => savedSrcToFile(title)}
      >
        <AutoAwesomeIcon className="text-default-sys-light-on-primary" />
      </IconButton>
    );
  else
    return (
      <Button
        className="bg-default-sys-light-primary pointer-events-auto cursor-pointer space-x-3 pl-3.5 pr-5 py-2.5"
        onClick={() => savedSrcToFile(title)}
        variant="contained"
        size="large"
        sx={{
          textTransform: "none",
        }}
        disableElevation
      >
        <AutoAwesomeIcon className="text-default-sys-light-on-primary" />
        <Typography className="text-3xl md:text-3xl lg:text-4xl tracking-wider">
          Generate
        </Typography>
      </Button>
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
      <Box className=" px-4 py-2 flex flex-col items-center gap-2 md:gap-2 lg:gap-3 z-0 text-default-ref-neutral-neutral40">
        <AddPhotoAlternateOutlinedIcon className="w-10 md:w-10 lg:w-14 h-auto aspect-square text-default-ref-neutral-neutral60" />
        <Typography className="text-center text-6xl md:text-6xl lg:text-8xl">
          Upload Image Here
          {/* <FileUploadOutlinedIcon className="text-default-sys-light-primary rounded-full py-1 border border-default-sys-light-primary bg-" />
          , or generate an image from the current title{" "} */}
        </Typography>
        <Typography className="text-3xl md:text-3xl lg:text-4xl">or</Typography>
        <GenerateImgBtn type="text" />
      </Box>
    </DndImageInput>
  );
};
