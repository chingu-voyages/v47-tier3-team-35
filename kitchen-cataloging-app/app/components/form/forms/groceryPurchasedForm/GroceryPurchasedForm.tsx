import { FoodItemSuccessResult } from "@/actions/food/types/types";
import { FoodItemVersion, GroceryItem } from "@prisma/client";
import { FormProps } from "../../types/types";
import { useEffect } from "react";
import { getSingleGroceryItem } from "@/actions/groceries/actions";
import { Alert, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import FormModalWrapper from "../../components/FormModalWrapper";
import { FormActionBtns, FormCloseBtn } from "../../components/FormActionBtns";
import FormHeader from "../../components/FormHeader";
import GroceryItemPurchasedSubmitFormWrapper from "./wrappers/GroceryItemPurchasedFormSubmitWrapper";
import GroceryItemFormPurchasedInputs from "./components/GroceryItemFormPurchasedInputs";
import FormLoading from "../../components/FormLoading";
import GroceryItemPurchasedFormWrappers from "./wrappers/GroceryItemPurchasedFormWrappers";
import useFormState from "../../hooks/useFormState";
export type GroceryItemPurchasedProps = Partial<
  GroceryItem & Pick<FoodItemVersion, "price" | "expirationDate" | "quantity">
>;
export default function GroceryPurchasedForm({
  children,
  itemId,
  defaultData,
}: Omit<
  FormProps<GroceryItemPurchasedProps, FoodItemSuccessResult>,
  "children" | "actionType"
> & {
  children: (props: { handleOpen: () => void }) => React.ReactNode;
}) {
  const {
    itemData,
    success,
    error,
    loading,
    open,
    setItemData,
    setLoading,
    handleOpen,
    savedErrFunc,
    handleClose,
  } = useFormState<GroceryItemPurchasedProps, FoodItemSuccessResult>({
    defaultData,
  });
  useEffect(() => {
    if (!itemId) return;
    if (open) return;
    setLoading(true);
    getSingleGroceryItem({ id: itemId })
      .then((res) => {
        setItemData((e) => {
          if (!e) return { quantity: res?.amount };
          return { ...e, quantity: res?.amount };
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        savedErrFunc({
          type: "error",
          statusCode: err.statusCode,
          message:
            "Could not fetch item details. Please refresh the page, and try again",
        });
      });
  }, [itemId, open, savedErrFunc]);
  const headerText = `Complete Purchase of ${itemData?.title}`;
  return (
    <>
      {children({ handleOpen })}
      {success && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          <Typography noWrap>
            {`Successfully purchased ${success.result.foodDoc.title} located in ${success.result.foodDoc.roomTitle}`}
          </Typography>
        </Alert>
      )}
      {error && (
        <Alert severity="error">
          <Typography noWrap>{error.message}</Typography>
        </Alert>
      )}
      <FormModalWrapper
        open={open}
        onClose={() => handleClose()}
        aria-describedby={`${headerText}-form`}
      >
        {/*Close Btn*/}
        <FormCloseBtn onClose={handleClose} />
        {/* Heading */}
        <FormHeader header={headerText} />
        <GroceryItemPurchasedFormWrappers
          //we add this key here because we want to FORCE react
          //to unmount and re-mount the components
          //anew, when open or loading state changes
          //this way we pre-fill providers with new item data everytime
          //the modal is opened, and therefore keep form updated with
          //most recent values
          key={open.toString() + loading.toString()}
          itemData={itemData}
        >
          <GroceryItemPurchasedSubmitFormWrapper
            groceryItemId={itemId}
            onClose={handleClose}
          >
            {loading && <FormLoading />}
            <GroceryItemFormPurchasedInputs />
            <FormActionBtns onClose={handleClose} />
          </GroceryItemPurchasedSubmitFormWrapper>
        </GroceryItemPurchasedFormWrappers>
      </FormModalWrapper>
    </>
  );
}