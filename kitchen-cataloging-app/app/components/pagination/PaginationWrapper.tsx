"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { unstable_batchedUpdates } from "react-dom";
export type IdRequiredObj<T> = {
  id: string;
} & T;
export type PaginationChildrenProps<T> = {
  isLoading: boolean;
  data: IdRequiredObj<T>[];
  loadMore?: () => Promise<void>;
};
export type PaginationFuncProps = {
  cursor?: string | null;
  take: number;
};
export type PaginationWrapperProps<T> = {
  take: number;
  defaultItems: IdRequiredObj<T>[] | null | undefined;
  threshold?: number;
  loadingComponent?: (
    ref: (node?: Element | null | undefined) => void
  ) => React.ReactNode;
  paginate: ({
    cursor,
    take,
  }: PaginationFuncProps) => Promise<IdRequiredObj<T>[] | null | undefined>;
  children: (
    props: PaginationChildrenProps<IdRequiredObj<T>>
  ) => React.ReactNode;
};
/**
 * @param take - The number of items you want to return in new data, at a time
 * @param defaultItems - The initial data to display, rendered on the server
 * @param paginate - A function that returns new data, and takes a  `cursor` which
 * is a string and a `take` value, which is a number
 * @param children - A function that passes `data`,`loading` and `loadMore` props, and returns a
 * ReactNode. The `data`contains the new current list data, and `loading` contains the current fetch state. 
 * You can also arbitraly trigger `loadMore` elsewhere by attaching to a component
 * @param threshold - Optional parameter that sets a container threshold for when the loading spinner is seen
 * @returns a function that contains `data`, and `loadMore` as parameters,
 * and returns your React.Node tree
 * ```
 * ```
 * @example
 * ```
<PaginationWrapper
      paginate={paginateRooms}
      take={20}
      defaultItems={defaultItems}
      loadingComponent={(ref) => <CircularProgress ref={ref} size={"large"} />}
    >
      {(props) => (
        <div>
          {props.data.map((item) => (
            <div>{item.id}</div>
          ))}
        </div>
      )}
</PaginationWrapper>
 * ```
 */
const determineDefaultCursor = <T,>(
  defaultItems: IdRequiredObj<T>[] | null | undefined
) => {
  return defaultItems && defaultItems.length > 0
    ? defaultItems[defaultItems.length - 1].id
    : null;
};
function PaginationWrapper<T>({
  take,
  defaultItems,
  paginate,
  children,
  threshold,
  loadingComponent,
}: PaginationWrapperProps<T>) {
  const [data, setData] = useState<IdRequiredObj<T>[]>(defaultItems || []);
  //we use ref because its a synchronous update, and good for internal component use,
  //as they are variables that will prevent expensive api call from re-running
  const cursorRef = useRef<string | null>(determineDefaultCursor(defaultItems));
  const [cursor, setCursor] = useState(cursorRef.current);
  const [ref, inView] = useInView({
    threshold: threshold,
  });
  const [isLoading, setIsLoading] = useState(false);
  //we use ref because its synchronous updates and good for internal component use,
  //as they are variables that will prevent expensive api call from re-running
  const isLoadingRef = useRef(isLoading);
  const isMounted = useRef(true);
  const loadMore = async () => {
    //if no cursor, we're already at the end of the list
    if (!cursorRef.current) return;
    //don't get any new data if loading is false.
    if (isLoadingRef.current || !isMounted.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    const newItems = await paginate({
      cursor: cursorRef.current || undefined,
      take,
    });
    //prevent state updates if component is unmounted
    if (!isMounted.current) return;
    if (!newItems) {
      cursorRef.current = null;
      isLoadingRef.current = false;
      return unstable_batchedUpdates(() => {
        setCursor(null);
        setIsLoading(false);
      });
    }
    const newCursor = newItems[newItems.length - 1].id;
    isLoadingRef.current = false;
    cursorRef.current = newCursor;
    unstable_batchedUpdates(() => {
      setCursor(newCursor);
      setIsLoading(false);
      //filter out data to improve stability, since
      //sometimes duplicate keys might arise when stressing system
      setData((prev) => {
        const map = Object.assign(
          {},
          ...prev.map((prev) => ({ [prev.id]: false }))
        );
        const newItemsFilter = newItems.filter((a) => !(a.id in map));
        return [...prev, ...newItemsFilter];
      });
    });
  };
  const saveLoadedData = useCallback(loadMore, [paginate, take]);
  //set mounted value, to ensure we aren't leaking any
  //memory by performing state updates when no component
  //exists
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
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
  //trigger new data when loading component is seen
  useEffect(() => {
    //means we can load more. If cursor is null, it means we reached the end
    if (inView) saveLoadedData();
  }, [inView, saveLoadedData]);

  return (
    <>
      {children({
        data,
        loadMore: saveLoadedData,
        isLoading,
      })}
      {cursor && loadingComponent && loadingComponent(ref)}
    </>
  );
}
export default PaginationWrapper;
