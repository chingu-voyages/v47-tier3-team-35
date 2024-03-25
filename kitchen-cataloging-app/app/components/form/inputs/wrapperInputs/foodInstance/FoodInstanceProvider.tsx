"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
// import {
//   FoodInstanceValueProps,
//   ValueProps,
// } from "../../innerComponents/select/types";
export type FoodInstanceContextProps = {
  foodInstance: string | null;
  setFoodInstance: Dispatch<SetStateAction<string | null>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  onChange: (e: string | null) => void;
};
const FoodInstanceContext = createContext<null | FoodInstanceContextProps>(
  null
);
export const FoodInstanceProvider = ({
  defaultValue,
  children,
}: {
  defaultValue?: string | null;
  children: React.ReactNode;
}) => {
  const [foodInstance, setFoodInstance] = useState(defaultValue || null);
  const [error, setError] = useState(false);
  const onChange = (value: string | null) => {
    const newValue = value || null;
    setFoodInstance(newValue);
  };
  const savedOnChangeFunc = useCallback(onChange, []);
  return (
    <FoodInstanceContext.Provider
      value={{
        foodInstance,
        setFoodInstance,
        error,
        setError,
        onChange: savedOnChangeFunc,
      }}
    >
      {children}
    </FoodInstanceContext.Provider>
  );
};
export const useFoodInstanceInput = () => useContext(FoodInstanceContext);
