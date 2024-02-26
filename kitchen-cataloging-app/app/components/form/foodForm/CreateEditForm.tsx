import * as React from "react";
import { FoodType } from "@/prisma/mock/mockData";
import FormInputs from "./components/FormInputs";
import Modal from "@mui/material/Modal";
import { PriceProvider } from "../inputs/price/PriceProvider";
import { DescriptionProvider } from "../inputs/description/DescriptionProvider";
import { TitleProvider } from "../inputs/title/TitleProvider";
import { CreateEditFormProps } from "../types/types";
export default function CreateEditForm({
  children,
  type,
  spaces,
  userId,
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
      <Modal
        className="flex m-auto w-full h-full sm:px-[10vw] sm:py-[5vh]"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TitleProvider defaultValue={itemData?.title}>
          <DescriptionProvider defaultValue={itemData?.description}>
            <PriceProvider defaultValue={itemData?.price}>
              <FormInputs
                type={type}
                spaces={spaces}
                onClose={handleClose}
                userId={userId}
                itemData={itemData}
              />
            </PriceProvider>
          </DescriptionProvider>
        </TitleProvider>
      </Modal>
    </>
  );
}
