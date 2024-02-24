import { ChangeEvent, useState, useEffect } from "react";
import Image from "next/image";
import { DragEvent } from "react";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import uploadImages, { FileMediaType } from "@/aws/content/uploadImages";

import { resizeImgToSquare } from "@/aws/content/processImages";
const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "SVG"];

interface DragDrop {
  name: string;
  handleImage: (files: FileMediaType[]) => void;
  imageUrl?: string;
}

function DragDrop({ name, handleImage, imageUrl }: DragDrop) {
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);

  const getImage = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // Check if files contain any images
    if (files[0].type.match(/^image\//)) {
      setFile(files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.match(/^image\//)) {
        setFile(selectedFile);
      }
    }
  };

  // useEffect to handle file upload
  useEffect(() => {
    if (file) {
      // console.log(file);
      // const uploadedImgs = async (file: File) => {
      //   try {
      //     const imgData = await uploadImages({ files: [file] });
      //     if ("uploaded" in imgData && Array.isArray(imgData.uploaded)) {
      //       // imgData has the shape { uploaded: FileMediaType[] }
      //       const uploadedFiles: FileMediaType[] = imgData.uploaded;
      //       console.log(uploadedFiles);
      //       handleImage(uploadedFiles);
      //     }
      //   } catch (e) {
      //     console.error(e);
      //   }
      // };
      // uploadedImgs(file);
    }
  }, [file, name, handleImage]);

  return (
    <div
      className="dropzone absolute top-0 left-0 z-40 bg-transparent w-full h-full"
      onDragEnter={() => setDrag(true)}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        getImage(e);
        setDrag(false);
      }}
    >
      <input
        className="w-full h-full bg-transparent z-50 opacity-0 cursor-pointer"
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => handleFileSelect(e)}
      ></input>
      <div
        className={`absolute top-[2px] left-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] -z-10 box-content rounded-lg flex justify-center items-center ${
          drag && "bg-slate-400 opacity-30"
        } ${file && "bg-slate-300"}`}
      >
        {imageUrl?.match(/unsplash/) && (
          <Image
            alt={name}
            className="w-full h-full object-cover"
            width="300"
            height="300"
            src={imageUrl}
          ></Image>
        )}
        {file && (
          <div className="max-w-30 text-sm flex items-center gap-2">
            <DownloadDoneIcon />
            Image successfully uploaded!
          </div>
        )}
      </div>
    </div>
  );
}

export default DragDrop;
