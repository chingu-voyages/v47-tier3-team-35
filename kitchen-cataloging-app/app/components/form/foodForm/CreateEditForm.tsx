import * as React from "react";
import { FoodType } from "@/prisma/mock/mockData";
import FormInputs from "./components/FormInputs";
import Modal from "@mui/material/Modal";
import { PriceProvider } from "../inputs/wrapperInputs/price/PriceProvider";
import { DescriptionProvider } from "../inputs/wrapperInputs/description/DescriptionProvider";
import { TitleProvider } from "../inputs/wrapperInputs/title/TitleProvider";
import { CreateEditFormProps } from "../types/types";
import { Box } from "@mui/material";
import { LabelsProvider } from "../inputs/wrapperInputs/labels/LabelsProvider";
import { SpaceProvider } from "../inputs/wrapperInputs/space/SpaceProvider";
export default function CreateEditForm({
  children,
  type,
  itemData,
}: CreateEditFormProps<FoodType>) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className={"cursor-pointer"} onClick={handleOpen}>
        {children}
      </div>
      <SpaceProvider
        defaultValue={
          itemData && itemData.roomId
            ? {
                label: itemData.roomTitle,
                value: itemData.roomId
              }
            : null
        }
      >
        <TitleProvider defaultValue={itemData?.title}>
          <DescriptionProvider defaultValue={itemData?.description}>
            <PriceProvider defaultValue={itemData?.price}>
              <LabelsProvider defaultValue={itemData?.labels}>
                <Modal
                  className="flex m-auto w-full h-full sm:px-[10vw] sm:py-[5vh]"
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className="flex flex-col w-full">
                    <FormInputs
                      type={type}
                      onClose={handleClose}
                      itemData={itemData}
                    />
                  </Box>
                </Modal>
              </LabelsProvider>
            </PriceProvider>
          </DescriptionProvider>
        </TitleProvider>
      </SpaceProvider>
    </>
  );
}
