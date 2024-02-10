import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

interface DragDrop {
  // children: React.ReactNode;
  handleImage: (file: File) => void;
}

function DragDrop({ handleImage}: DragDrop) {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    handleImage(file)
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}/>
  );
}

export default DragDrop;
