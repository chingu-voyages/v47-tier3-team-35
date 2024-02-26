"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
export type DescriptionContextProps = {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};
const DescriptionContext = createContext<null | DescriptionContextProps>(null);
export const DescriptionProvider = ({
  defaultValue,
  children,
}: {
  defaultValue?: string | null;
  children: React.ReactNode;
}) => {
  const [description, setDescription] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value !== "") {
      setError(false);
    }
  };
  return (
    <DescriptionContext.Provider
      value={{
        description,
        setDescription,
        error,
        setError,
        onChange,
      }}
    >
      {children}
    </DescriptionContext.Provider>
  );
};
export const useDescriptionInput = () => useContext(DescriptionContext);
