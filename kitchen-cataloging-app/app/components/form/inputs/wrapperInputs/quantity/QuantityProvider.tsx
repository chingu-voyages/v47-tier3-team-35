"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
export type QuantityContextProps = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};
const QuantityContext = createContext<null | QuantityContextProps>(null);
export const QuantityProvider = ({
  defaultValue,
  children,
}: {
  defaultValue?: number;
  children: React.ReactNode;
}) => {
  const [quantity, setQuantity] = useState(defaultValue || 0);
  const [error, setError] = useState(false);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value;
    if (val === "") return setQuantity(0);
    const valNum = parseInt(val);
    if (Number.isNaN(valNum)) return setQuantity(0);
    setQuantity(valNum);
  };
  return (
    <QuantityContext.Provider
      value={{
        quantity,
        setQuantity,
        error,
        setError,
        onChange,
      }}
    >
      {children}
    </QuantityContext.Provider>
  );
};
export const useQuantityInput = () => useContext(QuantityContext);
