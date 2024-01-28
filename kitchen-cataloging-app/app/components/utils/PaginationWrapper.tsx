"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { unstable_batchedUpdates } from "react-dom";
export type IdRequiredObj<T> = {
  id: string;
} & T;
export type PaginationChildrenProps<T> = {
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
 * @param children - A function that takes a `ref` and `data` props, and returns a
 * ReactNode. The `ref` is a function that takes a DOM node as an argument, and
 * is used to track the intersection observer, to decide when to paginate.
 * This is usually the list container of your paginated items. The `data`
 * contains the new current list data
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
  const [cursor, setCursor] = useState<string | null>(null);
  const [ref, inView] = useInView({
    threshold: threshold,
  });
  const loadMore = async () => {
    const newItems = await paginate({
      cursor: cursor ? cursor : undefined,
      take,
    });
    if (!newItems) {
      return setCursor(null);
    }
    const newCursor = newItems[newItems.length - 1].id;
    unstable_batchedUpdates(() => {
      setData((prev) => [...prev, ...newItems]);
      setCursor(newCursor);
    });
  };
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);
  return (
    <>
      {children({
        data,
        loadMore,
      })}
      {cursor && loadingComponent && loadingComponent(ref)}
    </>
  );
}
export default PaginationWrapper;
