"use client";
import FullPageTextSearch from "@/components/search/FullPageTextSearch";
import { usePaginationProvider } from "@/components/pagination/PaginationProvider";
import React, { useMemo } from "react";
export default function GroceriesSearch() {
  const context = usePaginationProvider();
  const search = context?.props().loadNew;
  const searchFunc = useMemo(
    () => async (text: string) => {
      if (!search) return;
      search({
        text,
      });
    },
    [search]
  );
  return (
    <FullPageTextSearch placeholder="Search items" searchFunc={searchFunc} />
  );
}
