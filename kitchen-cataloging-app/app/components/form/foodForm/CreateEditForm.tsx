import { FoodType } from "@/prisma/mock/mockData";
import FormInputs from "./components/FormInputs";
import Modal from "@mui/material/Modal";
import { PriceProvider } from "../inputs/wrapperInputs/price/PriceProvider";
import { DescriptionProvider } from "../inputs/wrapperInputs/description/DescriptionProvider";
import { TitleProvider } from "../inputs/wrapperInputs/title/TitleProvider";
import { CreateEditFormProps } from "../types/types";
import { Box, CircularProgress, Typography } from "@mui/material";
import { LabelsProvider } from "../inputs/wrapperInputs/labels/LabelsProvider";
import { SpaceProvider } from "../inputs/wrapperInputs/space/SpaceProvider";
import { DndFileProvider } from "../inputs/innerComponents/dnd/DnDProvider";
import { useEffect, useState } from "react";
import { getFood } from "@/actions/food/actions";
import { ExpirationDateProvider } from "../inputs/wrapperInputs/expirationDate/ExpirationDateProvider";
import FormSubmitWrapper from "../components/FormSubmitWrapper";
import { FormActionBtns, FormCloseBtn } from "../components/FormActionBtns";
import FormHeader from "../components/FormHeader";
import { ThresholdProvider } from "../inputs/wrapperInputs/threshold/ThresholdProvider";
export const CreateEditFormWrappers = ({
  itemData,
  children,
}: {
  itemData: FoodType | null;
  children: React.ReactNode;
}) => {
  const spaceValue =
    itemData && itemData.roomId
      ? {
          label: itemData.roomTitle,
          value: itemData.roomId,
        }
      : null;
  return (
    <SpaceProvider defaultValue={spaceValue}>
      <TitleProvider defaultValue={itemData?.title}>
        <DescriptionProvider defaultValue={itemData?.description}>
          <PriceProvider defaultValue={itemData?.price}>
            <LabelsProvider defaultValue={itemData?.labels}>
              <DndFileProvider defaultValue={itemData?.image?.url}>
                <ExpirationDateProvider
                  defaultValue={itemData?.expirationDate.toString()}
                >
                  <ThresholdProvider defaultValue={itemData?.threshold}>
                    {children}
                  </ThresholdProvider>
                </ExpirationDateProvider>
              </DndFileProvider>
            </LabelsProvider>
          </PriceProvider>
        </DescriptionProvider>
      </TitleProvider>
    </SpaceProvider>
  );
};
export default function CreateEditForm({
  children,
  type,
  itemId,
  defaultData,
}: CreateEditFormProps<FoodType>) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [itemData, setItemData] = useState<FoodType | null>(
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
        setItemData(res);
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
                <FormSubmitWrapper>
                  {loading && (
                    <Box className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full bg-default-sys-light-surface-container-low z-10 space-y-5">
                      <CircularProgress size={"3.5rem"} />
                      <Typography className="text-6xl text-default-sys-light-primary">
                        Loading item data ...
                      </Typography>
                    </Box>
                  )}
                  <FormInputs />
                  <FormActionBtns onClose={handleClose} />
                </FormSubmitWrapper>
              </CreateEditFormWrappers>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
