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
function PaginationWrapper<T>({
  take,
  defaultItems,
  paginate,
  children,
  threshold,
  loadingComponent,
}: PaginationWrapperProps<T>) {
  const [data, setData] = useState<IdRequiredObj<T>[]>(
    defaultItems ? defaultItems : []
  );
  const [cursor, setCursor] = useState<string | null>(
    defaultItems && defaultItems.length > 0
      ? defaultItems[defaultItems.length - 1].id
      : null
  );
  const [ref, inView] = useInView({
    threshold: threshold,
  });
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(true);
  const loadMore = async () => {
    //don't get any new data if loading is false
    if (isLoading || !isMounted.current) return;
    setIsLoading(true);
    const newItems = await paginate({
      cursor: cursor ? cursor : undefined,
      take,
    });
    //prevent state updates if component is unmounted
    if (!isMounted.current) return;
    if (!newItems) {
      return unstable_batchedUpdates(() => {
        setIsLoading(false);
        setCursor(null);
      });
    }
    const newCursor = newItems[newItems.length - 1].id;
    unstable_batchedUpdates(() => {
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
      setCursor(newCursor);
    });
  };
  const saveLoadedData = useCallback(loadMore, [
    cursor,
    isLoading,
    paginate,
    take
  ]);
  useEffect(() => {
    isMounted.current = true;
    //means we can load more. If cursor is null, it means we reached the end
    if (inView && cursor) {
      saveLoadedData();
    }
    return () => {
      isMounted.current = false;
    };
  }, [inView, cursor, saveLoadedData]);
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
