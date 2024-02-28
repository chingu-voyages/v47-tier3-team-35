"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
export type ThresholdContextProps = {
  threshold: number;
  setThreshold: Dispatch<SetStateAction<number>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  onChange: (e: number) => void;
};
const ThresholdContext = createContext<null | ThresholdContextProps>(null);
export const ThresholdProvider = ({
  defaultValue,
  children,
}: {
  defaultValue?: number | null;
  children: React.ReactNode;
}) => {
  const [threshold, setThreshold] = useState(defaultValue || 0);
  const [error, setError] = useState(false);
  const onChange = (e: number) => {
    setThreshold(e);
  };
  return (
    <ThresholdContext.Provider
      value={{
        threshold,
        setThreshold,
        error,
        setError,
        onChange,
      }}
    >
      {children}
    </ThresholdContext.Provider>
  );
};
export const useThresholdInput = () => useContext(ThresholdContext);
