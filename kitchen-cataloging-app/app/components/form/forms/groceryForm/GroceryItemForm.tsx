import { GroceryItem } from "@prisma/client";
import React, { useEffect } from "react";
import { FormProps } from "../../types/types";
import {
  GroceryItemCreateResult,
  GroceryItemUpdateResult,
} from "@/actions/groceries/types/types";
import CheckIcon from "@mui/icons-material/Check";
import { getSingleGroceryItem } from "@/actions/groceries/actions";
import { Alert, Typography } from "@mui/material";
import FormModalWrapper from "../../components/FormModalWrapper";
import { FormActionBtns, FormCloseBtn } from "../../components/FormActionBtns";
import FormHeader from "../../components/FormHeader";
import GroceryItemFormWrappers from "./wrappers/GroceryItemFormWrappers";
import GroceryItemFormSubmitWrapper from "./wrappers/GroceryItemFormSubmitWrapper";
import FormLoading from "../../components/FormLoading";
import GroceryItemFormInputs from "./components/GroceryItemFormInputs";
import useFormState from "../../hooks/useFormState";
export type GroceryItemSuccessResult =
  | GroceryItemCreateResult
  | GroceryItemUpdateResult;
export default function GroceryItemForm({
  children,
  actionType,
  itemId,
  defaultData,
}: Omit<FormProps<GroceryItem, GroceryItemSuccessResult>, "children"> & {
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
  } = useFormState<GroceryItem, GroceryItemSuccessResult>({
    defaultData,
  });
  useEffect(() => {
    if (!itemId) return;
    if (actionType === "create" && open) return;
    setLoading(true);
    getSingleGroceryItem({ id: itemId })
      .then((res) => {
        setItemData(res);
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
              success.result.title
            } located in ${success.result.roomTitle}`}
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
        <GroceryItemFormWrappers
          //we add this key here because we want to FORCE react
          //to unmount and re-mount the components
          //anew, when open or loading state changes
          //this way we pre-fill providers with new item data everytime
          //the modal is opened, and therefore keep form updated with
          //most recent values
          key={open.toString() + loading.toString()}
          itemData={itemData}
        >
          <GroceryItemFormSubmitWrapper
            groceryItemId={actionType === "edit" ? itemData?.id : undefined}
            onClose={handleClose}
          >
            {loading && <FormLoading />}
            <GroceryItemFormInputs />
            <FormActionBtns onClose={handleClose} />
          </GroceryItemFormSubmitWrapper>
        </GroceryItemFormWrappers>
      </FormModalWrapper>
    </>
  );
}
