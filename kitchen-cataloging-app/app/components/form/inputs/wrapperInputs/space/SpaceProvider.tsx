"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { ValueProps } from "../../innerComponents/select/types";
export type SpaceContextProps = {
  space: ValueProps | null;
  setSpace: Dispatch<SetStateAction<ValueProps | null>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  onChange: (e: ValueProps | null) => void;
};
const SpaceContext = createContext<null | SpaceContextProps>(null);
export const SpaceProvider = ({
  defaultValue,
  children,
}: {
  defaultValue?: ValueProps | null;
  children: React.ReactNode;
}) => {
  const [space, setSpace] = useState(defaultValue || null);
  const [error, setError] = useState(false);
  const onChange = (value: ValueProps | null) => {
    const newValue = value || null;
    setSpace(newValue);
    
  };
  const savedOnChangeFunc = useCallback(onChange, []);
  return (
    <SpaceContext.Provider
      value={{
        space,
        setSpace,
        error,
        setError,
        onChange: savedOnChangeFunc,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};
export const useSpaceInput = () => useContext(SpaceContext);
