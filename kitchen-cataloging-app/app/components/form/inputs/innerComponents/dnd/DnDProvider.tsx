"use client";
import React, {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
export type DndFileContextProps = {
  defaultImgUrl?: string | null;
  dndFile: File | null;
  setDndFile: (e: File | null) => void;
  newFile: boolean;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  getImage: (e: DragEvent<HTMLDivElement>) => void;
  handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
const DndFileContext = createContext<null | DndFileContextProps>(null);
export const DndFileProvider = ({
  defaultValue,
  children,
}: {
  defaultValue?: string | null;
  children: React.ReactNode;
}) => {
  const [newFile, setNewFile] = useState(false);
  const [dndFile, setDndFile] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const setDndFileFunc = (e: File | null) => {
    setDndFile(e);
    setNewFile(true);
  };
  const getImage = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // Check if files contain any images
    if (files[0].type.match(/^image\//)) {
      setNewFile(true);
      setDndFile(files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.match(/^image\//)) {
        setNewFile(true);
        setDndFile(selectedFile);
      }
    }
  };
  return (
    <DndFileContext.Provider
      value={{
        defaultImgUrl: defaultValue,
        dndFile,
        newFile,
        loading,
        setLoading,
        setDndFile: setDndFileFunc,
        error,
        setError,
        getImage,
        handleFileSelect,
      }}
    >
      {children}
    </DndFileContext.Provider>
  );
};
export const useDndFileInput = () => useContext(DndFileContext);
