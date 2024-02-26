"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
export type TitleContextProps = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};
const TitleContext = createContext<null | TitleContextProps>(null);
export const TitleProvider = ({
  defaultValue,
  children,
}: {
  defaultValue?: string | null;
  children: React.ReactNode;
}) => {
  const [title, setTitle] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value !== "") {
      setError(false);
    } else setError(true); 
    setTitle(e.target.value);
  };
  return (
    <TitleContext.Provider
      value={{
        title,
        setTitle,
        error,
        setError,
        onChange,
      }}
    >
      {children}
    </TitleContext.Provider>
  );
};
export const useTitleInput = () => useContext(TitleContext);
