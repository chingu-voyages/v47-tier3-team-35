"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
export type PriceContextProps = {
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};
const PriceContext = createContext<null | PriceContextProps>(null);
export const PriceProvider = ({
  defaultValue,
  children,
}: {
  defaultValue?: number;
  children: React.ReactNode;
}) => {
  const [price, setPrice] = useState(defaultValue || 0.00);
  const [error, setError] = useState(false);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value;
    if (val === "") return setPrice(0.00);
    //two digits since we are working with prices
    const valNum = parseFloat(val).toFixed(2);
    setPrice(parseFloat(valNum));
  };
  return (
    <PriceContext.Provider
      value={{
        price,
        setPrice,
        error,
        setError,
        onChange,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
export const usePriceInput = () => useContext(PriceContext);
