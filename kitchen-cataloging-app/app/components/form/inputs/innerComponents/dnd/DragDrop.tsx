import React, { useState } from "react";
import Image from "next/image";
import { useDndFileInput } from "./DnDProvider";
import { Box, IconButton } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "SVG"];
interface DragDrop {
  name: string;
  defaultImageUrl?: string | null;
  children?: React.ReactNode;
  btnContainerChildren?: React.ReactNode;
}
function DragDrop({
  name,
  defaultImageUrl,
  children,
  btnContainerChildren,
}: DragDrop) {
  const props = useDndFileInput();
  if (!props) return <></>;
  const { newFile, getImage, handleFileSelect, dndFile, loading } = props;
  const [drag, setDrag] = useState(false);
  const borderStyles = `border-dashed border-default-sys-light-primary border-2`;
  return (
    <Box className="w-full flex-grow relative z-0">
      <div
        className="dropzone absolute top-0 left-0 z-10 bg-transparent w-full h-full"
        onDragEnter={() => setDrag(true)}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          getImage(e);
          setDrag(false);
        }}
      >
        <input
          className="relative w-full h-full z-10 cursor-pointer bg-transparent opacity-0"
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => handleFileSelect(e)}
        />
        <div
          className={`absolute top-0 left-0 w-full h-full z-10 box-content rounded-lg flex justify-center items-center pointer-events-none ${
            drag && "bg-slate-400 opacity-30"
          } ${newFile && "bg-slate-300"}`}
        >
          {defaultImageUrl && !dndFile && (
            <Image
              alt={name}
              className="w-full h-full object-cover"
              width="300"
              height="300"
              src={defaultImageUrl}
            />
          )}
          {dndFile && (
            <img
              className="w-full h-full object-cover object-center"
              id={`${name}-new-image-preview`}
              src={URL.createObjectURL(dndFile)}
              alt={`${name}-new-image-preview`}
            />
          )}
        </div>
      </div>
      <Box className="image-icons absolute top-[12px] right-[12px] flex flex-row gap-3 z-20 pointer-events-none">
        <IconButton
          className="p-2 rounded-full bg-default-sys-light-on-primary border-default-sys-light-primary"
          sx={{
            border: 1,
          }}
        >
          <FileUploadOutlinedIcon className="text-default-sys-light-primary" />
        </IconButton>
        {btnContainerChildren}
      </Box>
      <Box
        className={`flex-grow relative ${
          !dndFile && !defaultImageUrl ? "z-30" : "-z-10"
        } w-full h-full rounded-lg flex justify-center items-center p-10 pointer-events-none ${
          dndFile ? "" : borderStyles
        }`}
      >
        {children}
      </Box>
    </Box>
  );
}

export default DragDrop;
