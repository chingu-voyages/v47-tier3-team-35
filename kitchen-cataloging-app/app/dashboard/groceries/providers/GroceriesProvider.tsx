"use client";
import React, { createContext, useContext, useState } from "react";
export type PageTypeProps = "shopping" | "purchased";
// Creating a new context
const GroceriesContext = createContext<{
  pageType: PageTypeProps;
  setPageType: React.Dispatch<React.SetStateAction<PageTypeProps>>;
} | null>(null);

// Creating a provider component
const GroceriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageType, setPageType] = useState<PageTypeProps>("shopping");
  const props = {
    pageType,
    setPageType,
  };
  // Return the provider component with the value prop set to the data
  return (
    <GroceriesContext.Provider value={props}>
      {children}
    </GroceriesContext.Provider>
  );
};
export const useGroceries = () => useContext(GroceriesContext);
export default GroceriesProvider;
