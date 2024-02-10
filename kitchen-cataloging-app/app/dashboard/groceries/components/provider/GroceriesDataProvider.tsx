"use client";
import { IdRequiredObj } from "@/components/pagination/PaginationWrapper";
import useDataArr from "@/hooks/useDataArr";
import { GroceryItem } from "@prisma/client";
import React from "react";
import { createContext } from "react";
export type GroceriesDataContextProps<A, T> = {
  data: (A & IdRequiredObj<A>)[] | null;
  loading: boolean;
  getNewDefaultData: (props: T) => Promise<void>;
  addToCurrData: (props: T) => Promise<void>;
};
export type GroceriesDataProviderProps<A, T> = {
  defaultData?: (A & IdRequiredObj<A>)[] | null;
  children: React.ReactNode;
  fetchNewData: (props: T) => Promise<(A & IdRequiredObj<A>)[] | null>;
};
export const GroceriesDataContext =
  createContext<null | GroceriesDataContextProps<GroceryItem, any>>(null);
export default function GroceriesDataProvider<T>({
  defaultData,
  fetchNewData,
  children,
}: GroceriesDataProviderProps<GroceryItem, T>) {
  const { data, getNewDefaultData, addToCurrData, loading } = useDataArr({
    defaultData,
    fetchNewData,
  });
  const value = {
    data,
    getNewDefaultData,
    addToCurrData,
    loading,
  };
  return (
    <GroceriesDataContext.Provider value={value}>
      {children}
    </GroceriesDataContext.Provider>
  );
}
