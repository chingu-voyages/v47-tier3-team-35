"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
export type ExpirationDateContextProps = {
  expirationDate: string;
  setExpirationDate: Dispatch<SetStateAction<string>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  onChange: (e: string | null) => void;
};
const ExpirationDateContext = createContext<null | ExpirationDateContextProps>(
  null
);
export const ExpirationDateProvider = ({
  defaultValue,
  children,
}: {
  defaultValue?: string | null;
  children: React.ReactNode;
}) => {
  const [expirationDate, setExpirationDate] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  const onChange = (e: string | null) => {
    setExpirationDate(e || "");
  };
  return (
    <ExpirationDateContext.Provider
      value={{
        expirationDate,
        setExpirationDate,
        error,
        setError,
        onChange,
      }}
    >
      {children}
    </ExpirationDateContext.Provider>
  );
};
export const useExpirationDateInput = () => useContext(ExpirationDateContext);
