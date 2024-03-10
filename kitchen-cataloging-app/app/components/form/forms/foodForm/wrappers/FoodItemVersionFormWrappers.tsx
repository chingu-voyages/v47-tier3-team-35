import { PriceProvider } from "@/components/form/inputs/wrapperInputs/price/PriceProvider";
import { ExpirationDateProvider } from "@/components/form/inputs/wrapperInputs/expirationDate/ExpirationDateProvider";
import { QuantityProvider } from "@/components/form/inputs/wrapperInputs/quantity/QuantityProvider";
import { FoodItemVersion } from "@prisma/client";

const FoodItemVersionWrappers = ({
  itemData,
  children,
}: {
  itemData?: Partial<FoodItemVersion> | null;
  children: React.ReactNode;
}) => {
  return (
    <PriceProvider defaultValue={itemData?.price}>
      <QuantityProvider defaultValue={itemData?.quantity}>
        <ExpirationDateProvider
          defaultValue={itemData?.expirationDate?.toString()}
        >
          {children}
        </ExpirationDateProvider>
      </QuantityProvider>
    </PriceProvider>
  );
};
export default FoodItemVersionWrappers;
