"use client";
import PaginationWrapper from "@/components/pagination/PaginationWrapper";
import LoadingComponent from "@/components/pagination/FullPagePaginationLoadingComponent";
import useWindowWidth from "@/hooks/useWindowWidth";
import InventoryListGridWrapper, {
  InventoryListItemGridWrapper,
} from "@/components/inventoryList/wrappers/InventoryListGridWrapper";
import { IdRequiredObj } from "@/components/pagination/types";
const InventoryList = <T,>({
  defaultItems,
  children,
}: {
  defaultItems?: IdRequiredObj<T>[] | null;
  children: ({
    item,
    width,
    borderRadius,
  }: {
    item: IdRequiredObj<T>;
    width: {
      small: boolean;
      medium: boolean;
    };
    borderRadius: {
      top: string;
      bottom: string;
    };
  }) => React.ReactNode;
}) => {
  const smallWidth = useWindowWidth(400);
  const mediumWidth = useWindowWidth(640);
  const cardTopBorderRadius =
    "rounded-t-23xl xs:rounded-t-26xl md:rounded-t-28xl";
  const cardBottomBorderRadius =
    "rounded-b-23xl xs:rounded-b-26xl md:rounded-b-28xl";
  return (
    <PaginationWrapper
      defaultItems={defaultItems}
      loadingComponent={(ref) => <LoadingComponent setRef={ref} />}
    >
      {(props) => (
        <InventoryListGridWrapper>
          {props.data.map((item) => (
            <InventoryListItemGridWrapper key={item.id}>
              {children({
                item,
                width: { small: smallWidth, medium: mediumWidth },
                borderRadius: {
                  top: cardTopBorderRadius,
                  bottom: cardBottomBorderRadius,
                },
              })}
            </InventoryListItemGridWrapper>
          ))}
        </InventoryListGridWrapper>
      )}
    </PaginationWrapper>
  );
};

export default InventoryList;
