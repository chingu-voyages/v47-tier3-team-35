"use client";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PaginationWrapperProps, PaginationProviderProps } from "./types";
import PaginationProvider, {
  usePaginationProvider,
} from "./PaginationProvider";
function PaginationInnerWrapper<T>({
  children,
  threshold,
  loadingComponent,
}: PaginationWrapperProps<T>) {
  const providerProps = usePaginationProvider();
  const props = providerProps?.props<T>();
  const [ref, inView] = useInView({
    threshold: threshold,
  });
  const loadMore = props?.loadMore;
  //trigger new data when loading component is seen
  useEffect(() => {
    //means we can load more. If cursor is null, it means we reached the end
    if (inView && loadMore) loadMore();
  }, [inView, loadMore]);
  if (!props) return <></>;
  return (
    <>
      {children({
        data: props.data,
        loadMore: props.loadMore,
        isLoading: props.isLoading,
      })}
      {props.cursor && loadingComponent && loadingComponent(ref)}
    </>
  );
}
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

function PaginationWrapper<T>(
  props: PaginationWrapperProps<T> & Partial<PaginationProviderProps<T>>
) {
  const providerProps = usePaginationProvider();
  if (providerProps)
    return (
      <>
        <PaginationInnerWrapper {...props}>
          {props.children}
        </PaginationInnerWrapper>
      </>
    );
  else
    return (
      <PaginationProvider
        take={props.take || 0}
        defaultItems={props.defaultItems || []}
        paginate={props.paginate || (() => Promise.resolve(null))}
      >
        <PaginationInnerWrapper {...props}>
          {props.children}
        </PaginationInnerWrapper>
      </PaginationProvider>
    );
}
export default PaginationWrapper;
