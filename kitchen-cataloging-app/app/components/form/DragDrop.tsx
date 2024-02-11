import React, { ChangeEvent, useState } from "react";
import { DragEvent } from "react";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import './drag-drop.css'

const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "SVG"];

interface DragDrop {
  name: string;
  image?: string;
}

function DragDrop({ name, image }: DragDrop) {
  
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  
  const handleImage = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // Check if files contain any images
      if (files[0].type.match(/^image\//)) {
        setFile(files[0])
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

  const fileToDataURL = (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // useEffect to handle file change
  React.useEffect(() => {
    if (file) {
      fileToDataURL(file)
        .then((dataURL) => {
          // Set input value to data URL
          const inputElement = document.querySelector<HTMLInputElement>(
            `input[name="${name}"]`
          );
          if (inputElement) {
            inputElement.value = dataURL as string;
          }
        })
        .catch((error) => {
          console.error("Error converting file to data URL:", error);
        });
    }
  }, [file, name]);
  
  return (
    <div
      className="dropzone absolute top-0 left-0 z-40 bg-transparent w-full h-full"
      onDragEnter={() => setDrag(true)}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        handleImage(e);
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
        className={`absolute top-[2px] left-[2px] inner-container -z-10 box-content rounded-lg flex justify-center items-center ${
          drag && "bg-slate-400 opacity-30"
        } ${file && "bg-slate-300"}`}
      >
        {image?.match(/unsplash/) && 
          <img className="w-full h-full object-cover" src={image}></img>
        }
        {file &&
          <div className="max-w-30 text-sm flex items-center gap-2">
            <DownloadDoneIcon/>
            Image successfully uploaded!
        </div>}
      </div>
      <input
        className="w-0 h-0 bg-transparent opacity-0"
        type="text"
        name="image"
        value={image ? image : ''}
        readOnly
      ></input>
    </div>
  );
}

export default DragDrop;
