import { CreateEditFormProps } from "../types/types";
import { useEffect, useState } from "react";
import { getFood } from "@/actions/food/actions";
import { FormActionBtns, FormCloseBtn } from "../components/FormActionBtns";
import { Box } from "@mui/material";
import FormInputs from "./components/FormInputs";
import Modal from "@mui/material/Modal";
import FormHeader from "../components/FormHeader";
import FormLoading from "../components/FormLoading";
import FoodItemVersionWrappers from "../wrappers/FoodItemVersionFormWrappers";
import { FoodType } from "@/prisma/mock/mockData";
import { FoodItemVersion } from "@prisma/client";
import FoodItemFormWrappers from "../wrappers/FoodItemFormWrappers";
import FoodFormSubmitWrapper from "./FoodFormSubmitWrapper";
type FoodItemFormType = FoodType & {
  recentFoodItemVer?: Partial<FoodItemVersion> | null;
};
export const CreateEditFormWrappers = ({
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
export default function CreateEditForm({
  children,
  type,
  itemId,
  defaultData,
}: CreateEditFormProps<FoodItemFormType>) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [itemData, setItemData] = useState<FoodItemFormType | null>(
    defaultData || null
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (!itemId) return;
    if (type === "create" && open) return;
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
        setError(true);
      });
  }, [itemId, type, open]);

  return (
    <>
      <div className={"cursor-pointer"} onClick={handleOpen}>
        {children}
      </div>
      <Modal
        className="flex m-auto w-full h-full sm:px-[10vw] sm:py-[5vh] justify-center"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex flex-col w-full h-full md:max-h-[750px] md:max-w-screen-xl my-auto">
          <Box className="relative flex flex-col w-full h-full bg-default-sys-light-surface-container-low pt-6 px-10 pb-0 overflow-y-auto">
            <Box className="flex flex-col w-full md:m-auto">
              {/*Close Btn*/}
              <FormCloseBtn onClose={handleClose} />
              {/* Heading */}
              <FormHeader
                header={`${type.slice(0, 1).toUpperCase()}${type.slice(
                  1
                )} Item`}
              />
              <CreateEditFormWrappers
                //we add this key here because we want to FORCE react
                //to unmount and re-mount the components
                //anew, when open or loading state changes
                //this way we pre-fill providers with new item data everytime
                //the modal is opened, and therefore keep form updated with
                //most recent values
                key={open.toString() + loading.toString()}
                itemData={itemData}
              >
                <FoodFormSubmitWrapper type={type} onClose={handleClose}>
                  {loading && <FormLoading />}
                  <FormInputs type={type} />
                  <FormActionBtns onClose={handleClose} />
                </FoodFormSubmitWrapper>
              </CreateEditFormWrappers>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
