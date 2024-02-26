"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { MultiValue } from "react-select";
import { ValueProps } from "../../innerComponents/select/types";
export type LabelsContextProps = {
  labels: string[];
  setLabels: Dispatch<SetStateAction<string[]>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  onChange: (e: MultiValue<ValueProps>) => string[];
};
const LabelsContext = createContext<null | LabelsContextProps>(null);
export const LabelsProvider = ({
  defaultValue,
  children,
}: {
  defaultValue?: string[] | null;
  children: React.ReactNode;
}) => {
  const [labels, setLabels] = useState(defaultValue || []);
  const [error, setError] = useState(false);
  const onChange = (e: MultiValue<ValueProps>) => {
    const newLabels = e.map((val) => val.value);
    setLabels(newLabels);
    return newLabels;
  };
  return (
    <LabelsContext.Provider
      value={{
        labels,
        setLabels,
        error,
        setError,
        onChange,
      }}
    >
      {children}
    </LabelsContext.Provider>
  );
};
export const useLabelsInput = () => useContext(LabelsContext);
