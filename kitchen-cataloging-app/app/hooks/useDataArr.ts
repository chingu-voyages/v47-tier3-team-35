
import React, { useMemo, useRef } from "react";
import { IdRequiredObj } from "@/components/pagination/PaginationWrapper";
import { unstable_batchedUpdates } from "react-dom";
const useDataArr = <T, A>({
  defaultData,
  fetchNewData,
}: {
  defaultData?: (A & IdRequiredObj<A>)[] | null;
  fetchNewData: (props: T) => Promise<(A & IdRequiredObj<A>)[] | null>;
}) => {
  const [data, setData] = React.useState<(A & IdRequiredObj<A>)[] | null>(
    defaultData || null
  );
  const [loading, setLoading] = React.useState(false);
  const loadingRef = useRef(loading);
  const startNewDataFetch = async (props: T) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    const data = await fetchNewData(props);
    return data;
  };
  const updateStateAfterFetch = (
    data: (A & IdRequiredObj<A>)[] | null,
    replace?: boolean
  ) => {
    unstable_batchedUpdates(() => {
      loadingRef.current = false;
      setLoading(false);
      setData((prev) => {
        if (!prev || replace) return data;
        if (!data) return prev;
        const map = Object.assign(
          {},
          ...prev.map((prev) => ({ [prev.id]: false }))
        );
        const newItemsFilter = data.filter((a) => !(a.id in map));
        return [...prev, ...newItemsFilter];
      });
    });
  };
  //saved functions to prevent re-rendering when not needed
  //this omptimizes the provider, since we won't trigger unneeded
  //re-rendering on potentially large list items
  const savedStartNewDataFetch = useMemo(
    () => startNewDataFetch,
    [fetchNewData]
  );
  const savedUpdateStateAfterFetch = useMemo(() => updateStateAfterFetch, []);
  const getNewDefaultData = async (props: T) => {
    const data = await savedStartNewDataFetch(props);
    if (data === undefined) return;
    savedUpdateStateAfterFetch(data, true);
  };
  const addToCurrData = async (props: T) => {
    const data = await savedStartNewDataFetch(props);
    if (data === undefined) return;
    savedUpdateStateAfterFetch(data, false);
  };
  //saved functions to prevent re-rendering when not needed
  //this omptimizes the provider, since we won't trigger unneeded
  //re-rendering on potentially large list items
  const savedGetNewDefaultData = useMemo(
    () => getNewDefaultData,
    [savedStartNewDataFetch, savedUpdateStateAfterFetch]
  );

  const savedAddToCurrData = useMemo(
    () => addToCurrData,
    [savedStartNewDataFetch, savedUpdateStateAfterFetch]
  );
  return {
    data,
    getNewDefaultData: savedGetNewDefaultData,
    addToCurrData: savedAddToCurrData,
    loading,
  };
};
export default useDataArr