import { FoodItemSuccessResult } from "@/actions/food/types/types";
import { FoodItemVersion, GroceryItem } from "@prisma/client";
import { FormProps } from "../../types/types";
import { useCallback, useEffect, useState } from "react";
import { ErrorMessage } from "@/utils/generateErrMessage";
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

export type GroceryItemPurchasedProps = Partial<
  GroceryItem & Pick<FoodItemVersion, "price" | "expirationDate" | "quantity">
>;
export default function GroceryPurchasedForm({
  children,
  actionType,
  itemId,
  defaultData,
}: Omit<
  FormProps<GroceryItemPurchasedProps, FoodItemSuccessResult>,
  "children"
> & {
  children: (props: { handleOpen: () => void }) => React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [success, setSuccess] = useState<FoodItemSuccessResult | null>(null);
  const [itemData, setItemData] = useState<GroceryItemPurchasedProps | null>(
    defaultData || null
  );
  const setErrFunc = (e: ErrorMessage) => {
    setError(e);
    setSuccess(null);
  };
  const setSuccessFunc = (e: FoodItemSuccessResult) => {
    setError(null);
    setSuccess(e);
  };
  const savedSuccessFunc = useCallback(setSuccessFunc, []);
  const savedErrFunc = useCallback(setErrFunc, []);
  const handleOpen = () => {
    setSuccess(null);
    setOpen(true);
  };
  const handleClose = (result?: FoodItemSuccessResult) => {
    if (result) savedSuccessFunc(result);
    setOpen(false);
  };
  useEffect(() => {
    if (!itemId) return;
    if (actionType === "create" && open) return;
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
  }, [itemId, actionType, open, savedErrFunc]);
  const headerText = `${actionType.slice(0, 1).toUpperCase()}${actionType.slice(
    1
  )} Item`;
  return (
    <>
      {children({ handleOpen })}
      {success && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          <Typography noWrap>
            {`Successfully ${actionType === "create" ? "added" : "updated"} ${
              success.result.foodDoc.title
            } located in ${success.result.foodDoc.roomTitle}`}
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
