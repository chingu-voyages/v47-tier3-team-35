import { FoodType } from "@/prisma/mock/mockData";
import { FoodItemVersion } from "@prisma/client";
import { useEffect } from "react";
import { getFood } from "@/actions/food/actions";
import { Alert, Typography } from "@mui/material";
import {
  FormActionBtns,
  FormCloseBtn,
} from "@/components/form/components/FormActionBtns";
import { FormProps } from "@/components/form/types/types";
import FoodItemInputs from "@/components/form/forms/foodForm/components/FoodItemInputs";
import FormHeader from "@/components/form/components/FormHeader";
import FormLoading from "@/components/form/components/FormLoading";
import FoodItemVersionWrappers from "@/components/form/forms/foodForm/wrappers/FoodItemVersionFormWrappers";
import FoodItemFormWrappers from "@/components/form/forms/foodForm/wrappers/FoodItemFormWrappers";
import FoodFormSubmitWrapper from "./wrappers/FoodFormSubmitWrapper";
import CheckIcon from "@mui/icons-material/Check";
import FormModalWrapper from "../../components/FormModalWrapper";
import { FoodItemSuccessResult } from "@/actions/food/types/types";
import useFormState from "../../hooks/useFormState";
type FoodItemFormType = Partial<FoodType> & {
  recentFoodItemVer?: Partial<FoodItemVersion> | null;
};
export const FoodFormWrappers = ({
  itemData,
  children,
}: {
  itemData: FoodItemFormType | null;
  children: React.ReactNode;
}) => {
  return (
    <FoodItemFormWrappers itemData={itemData}>
      <FoodItemVersionWrappers itemData={itemData?.recentFoodItemVer}>
        {children}
      </FoodItemVersionWrappers>
    </FoodItemFormWrappers>
  );
};
export default function FoodForm({
  children,
  actionType,
  itemId,
  defaultData,
  fullInputs = true,
}: Omit<FormProps<FoodItemFormType, FoodItemSuccessResult>, "children"> & {
  fullInputs?: boolean;
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
  } = useFormState<FoodItemFormType, FoodItemSuccessResult>({
    defaultData,
  });
  useEffect(() => {
    if (!itemId) return;
    if (actionType === "create" && open) return;
    setLoading(true);
    getFood({ foodId: itemId })
      .then((res) => {
        if (res?.recentFoodItemVer)
          setItemData({
            ...res,
            recentFoodItemVer: {
              ...res?.recentFoodItemVer,
              //allows for default data quantity to override previous purchased
              quantity:
                typeof defaultData?.recentFoodItemVer?.quantity === "number"
                  ? defaultData?.recentFoodItemVer?.quantity
                  : res?.recentFoodItemVer?.quantity,
            },
          });
        else setItemData(res);
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
        <FoodFormWrappers
          //we add this key here because we want to FORCE react
          //to unmount and re-mount the components
          //anew, when open or loading state changes
          //this way we pre-fill providers with new item data everytime
          //the modal is opened, and therefore keep form updated with
          //most recent values
          key={open.toString() + loading.toString()}
          itemData={itemData}
        >
          <FoodFormSubmitWrapper
            foodId={actionType === "edit" ? itemData?.id : undefined}
            fullInputs={fullInputs}
            onClose={handleClose}
          >
            {loading && <FormLoading />}
            <FoodItemInputs fullInputs={fullInputs} />
            <FormActionBtns onClose={handleClose} />
          </FoodFormSubmitWrapper>
        </FoodFormWrappers>
      </FormModalWrapper>
    </>
  );
}
