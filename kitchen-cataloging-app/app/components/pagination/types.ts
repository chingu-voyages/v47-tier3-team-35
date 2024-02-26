export type SearchFuncProps = {
  text?: string;
  spaceId?: string;
};
export type PaginationProps = {
  cursor?: string | null;
  // | {
  //     score: number;
  //     id: string;
  //   };
  take: number;
};
export type IdRequiredObj<T> = {
  id: string;
  score?: number;
} & T;
export type PaginationProviderProps<T> = {
  take: number;
  defaultItems: IdRequiredObj<T>[] | null | undefined;
  paginate: (
    props: PaginationProps & SearchFuncProps
  ) => Promise<IdRequiredObj<T>[] | null | undefined>;
  defaultParams?: Partial<SearchFuncProps>;
};
export type PaginatationProviderContextState = {
  props: <A>() => PaginationProviderContextProps<A>;
} | null;
export type PaginationProviderContextProps<T> = {
  isLoading: boolean;
  data: IdRequiredObj<T>[];
  cursor: string | null;
  loadMore?: (params?: SearchFuncProps) => Promise<void>;
  loadNew?: (params?: SearchFuncProps) => Promise<void>;
};
export type PaginationChildrenProps<T> = Omit<
  PaginationProviderContextProps<T>,
  "cursor"
>;
export type PaginationWrapperProps<T> = {
  threshold?: number;
  loadingComponent?: (
    ref: (node?: Element | null | undefined) => void
  ) => React.ReactNode;
  children: (
    props: PaginationChildrenProps<IdRequiredObj<T>>
  ) => React.ReactNode;
};
