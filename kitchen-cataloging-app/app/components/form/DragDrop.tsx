import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "SVG"];

interface DragDrop {
  children: React.ReactNode;
  name: string;
  handleImage: (file: File) => void;
}

function DragDrop({ children, name, handleImage}: DragDrop) {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    console.log('change')
    handleImage(file);
  };
  return (
    <FileUploader
      handleChange={handleChange}
      name={name}
      types={fileTypes}
      children={children}
      maxSize={1}
    />
  );
}

export default DragDrop;
