"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { unstable_batchedUpdates } from "react-dom";
import {
  IdRequiredObj,
  PaginatationProviderContextState,
  PaginationProviderContextProps,
  PaginationProviderProps,
  SearchFuncProps,
} from "./types";
const PaginationContext = createContext<PaginatationProviderContextState>(null);
const determineDefaultCursor = <T,>(
  defaultItems: IdRequiredObj<T>[] | null | undefined
) => {
  return defaultItems && defaultItems.length > 0
    ? defaultItems[defaultItems.length - 1].id
    : null;
};
const PaginationProvider = <T,>({
  paginate,
  take,
  defaultItems,
  children,
  defaultParams,
}: PaginationProviderProps<T> & {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<IdRequiredObj<T>[]>(defaultItems || []);
  //we use ref because its a synchronous update, and good for internal component use,
  //as they are variables that will prevent expensive api call from re-running
  const cursorRef = useRef<string | null>(determineDefaultCursor(defaultItems));
  const [cursor, setCursor] = useState(cursorRef.current);
  const [isLoading, setIsLoading] = useState(false);
  //we store our prev search params in this ref. Since we never need to expose this
  //to components, and will onlyt be used internally, we don't need to store in state
  //to re-render the component tree
  const prevSearch = useRef<undefined | SearchFuncProps | null>(defaultParams);
  //we use ref because its synchronous updates and good for internal component use,
  //as they are variables that will prevent expensive api call from re-running
  const isLoadingRef = useRef(isLoading);
  const isMounted = useRef(true);
  //reusable function, that handles state and ref updates, when a query is initiated
  //to fetch new items
  const startQuery = async ({
    params,
    usePrevCursor,
  }: {
    params?: SearchFuncProps;
    usePrevCursor: boolean;
  }) => {
    //don't get any new data if loading is false.
    if (isLoadingRef.current || !isMounted.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    const paginateFuncParams = {
      cursor: usePrevCursor ? cursorRef.current || undefined : undefined,
      take,
    };
    const newItems = await paginate(
      !params
        ? //for loading more we use the prev search values
          usePrevCursor && prevSearch.current
          ? {
              ...paginateFuncParams,
              ...prevSearch.current,
            }
          : //when replacing data, we simply load the default
            paginateFuncParams
        : {
            ...paginateFuncParams,
            ...params,
          }
    );
    prevSearch.current = params;
    //prevent state updates if component is unmounted
    if (!isMounted.current) return;
    if (!newItems) {
      cursorRef.current = null;
      isLoadingRef.current = false;
      unstable_batchedUpdates(() => {
        setCursor(null);
        setIsLoading(false);
      });
      return;
    }
    const newCursorId = newItems[newItems.length - 1].id;
    const newCursorScore = newItems[newItems.length - 1].score;
    const newCursor =
      //this means we're performing a text search with a relevant score
      params && params.text
        ? `${newCursorId}?score=${newCursorScore}`
        : //this means we're simply paginating by id
          newCursorId;
    isLoadingRef.current = false;
    cursorRef.current = newCursor;
    return {
      newItems,
      newCursor,
    };
  };
  const savedStartQuery = useCallback(startQuery, [paginate, take]);
  //this function will never re-use parameters, since it's supposed to
  //replace data completely. Therefore, parameters must be passed
  //during time of execution. However, these parameters will be saved
  //in subsequent calls of `loadMore`
  const loadNew = async (params?: SearchFuncProps) => {
    const result = await savedStartQuery({ params, usePrevCursor: false });
    if (!result) return;
    unstable_batchedUpdates(() => {
      setCursor(result.newCursor);
      setIsLoading(false);
      setData(result.newItems);
    });
  };
  //note that this function will re-use parameters, if no
  //new parameters are supplied. This is expected behavior
  //for a load more function
  const loadMore = async (params?: SearchFuncProps) => {
    //if no cursor, we're already at the end of the list
    if (!cursorRef.current) return;
    const result = await savedStartQuery({ params, usePrevCursor: true });
    if (!result) return;
    unstable_batchedUpdates(() => {
      setCursor(result.newCursor);
      setIsLoading(false);
      //filter out data to improve stability, since
      //sometimes duplicate keys might arise when stressing system
      setData((prev) => {
        const map = Object.assign(
          {},
          ...prev.map((prev) => ({ [prev.id]: false }))
        );
        const newItemsFilter = result.newItems.filter((a) => !(a.id in map));
        return [...prev, ...newItemsFilter];
      });
    });
  };
  const savedLoadNewData = useCallback(loadNew, [savedStartQuery]);
  const savedLoadMoreData = useCallback(loadMore, [savedStartQuery]);
  //set mounted value, to ensure we aren't leaking any
  //memory by performing state updates when no component
  //exists
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  //override when default item change
  useEffect(() => {
    if (!defaultItems) return;
    if (!isMounted.current) return;
    unstable_batchedUpdates(() => {
      if (!isMounted.current) return;
      setData(defaultItems);
      setCursor(determineDefaultCursor(defaultItems));
      cursorRef.current = determineDefaultCursor(defaultItems);
    });
  }, [defaultItems]);
  const savedProps = useMemo(
    () => ({
      props: <A,>() =>
        ({
          data,
          loadMore: savedLoadMoreData,
          loadNew: savedLoadNewData,
          isLoading,
          cursor,
        } as unknown as PaginationProviderContextProps<
          T extends A ? any : any
        >),
    }),
    [data, savedLoadMoreData, savedLoadNewData, isLoading, cursor]
  );
  return (
    <PaginationContext.Provider value={savedProps}>
      {children}
    </PaginationContext.Provider>
  );
};
export const usePaginationProvider = () => {
  return useContext(PaginationContext);
};
export default PaginationProvider;
