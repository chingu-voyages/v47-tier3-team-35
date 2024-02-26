import { Box, IconButton } from '@mui/material';
import React from 'react'
import DragDrop from '../innerComponents/dnd/DragDrop';
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
export default function ImageInput() {
  return (
    <Box className="flex-grow relative">
      <DragDrop
        name={"image"}
        imageUrl={image.url || ""}
        handleImage={handleImage}
      />
      <Box className="image-icons absolute top-[12px] right-[12px] flex flex-row gap-3 z-50 pointer-events-none">
        <IconButton className="p-2 rounded-full bg-default-sys-light-on-primary border border-default-sys-light-primary">
          <FileUploadOutlinedIcon className="text-default-sys-light-primary" />
        </IconButton>
        <IconButton
          className="p-2 rounded-full bg-default-sys-light-primary pointer-events-auto cursor-pointer"
          onClick={() =>
            srcToFile(
              `https://source.unsplash.com/random/300x300/?${imgTitle}`,
              imgTitle
            )
          }
        >
          <AutoAwesomeIcon className="text-default-sys-light-on-primary" />
        </IconButton>
      </Box>
      <Box
        className={`flex-grow relative w-full h-full border-dashed border-default-sys-light-primary border-2 rounded-lg flex justify-center items-center p-10`}
      >
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
      </Box>
    </Box>
  );
}
