"use client";
import PaginationWrapper from "@/components/pagination/PaginationWrapper";
import LoadingComponent from "@/components/pagination/FullPagePaginationLoadingComponent";
import useWindowWidth from "@/hooks/useWindowWidth";
import InventoryListGridWrapper, {
  InventoryListItemGridWrapper,
} from "@/components/inventoryList/wrappers/InventoryListGridWrapper";
import { IdRequiredObj } from "@/components/pagination/types";
import { Box, Typography } from "@mui/material";
import AddItemBtn from "../actionBtns/AddItemBtn";
const EmptyList = () => {
  return (
    <Box className="flex flex-col items-center justify-center w-full space-y-4">
      <Box className="flex flex-col justify-center items-center grow max-w-screen-sm">
        <Box className="flex items-center justify-center">
          <Typography className="text-10xl xs:text-11xl md:text-12xl xl:text-13xl leading-relaxed text-default-ref-neutral-neutral40 font-medium">
            No items found
          </Typography>
        </Box>
        <Typography className="text-2xl xs:text-3xl md:text-4xl xl:text-5xl leading-normal tracking-wide text-default-ref-neutral-neutral30 text-center">
          Add an item to get started
        </Typography>
      </Box>
      <AddItemBtn
        responsive={{
          disableTextHide: true,
        }}
      />
    </Box>
  );
};
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
      {(props) =>
        props.data.length <= 0 ? (
          <EmptyList />
        ) : (
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
        )
      }
    </PaginationWrapper>
  );
};

export default InventoryList;
