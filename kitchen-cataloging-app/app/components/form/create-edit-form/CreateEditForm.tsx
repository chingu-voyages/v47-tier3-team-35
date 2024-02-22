import * as React from "react";
import { FoodType } from "@/prisma/mock/mockData";
import FormInputs from "./components/FormInputs";
import Modal from "@mui/material/Modal";


interface CreateEditForm {
  children: React.ReactNode;
  type: "create" | "edit";
  spaces: string[];
  userId: string;
  itemData?: FoodType;
}

export default function CreateEditForm({
  children,
  type,
  spaces,
  userId,
  itemData,
}: CreateEditForm) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <>
      <div className={"cursor-pointer"} onClick={handleOpen}>
        {children}
      </div>
      <Modal
        className="max-w-[900px] bg-default-sys-light-surface-container-low mx-auto"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormInputs
          type={type}
          spaces={spaces}
          onClose={handleClose}
          userId={userId}
          itemData={itemData}
        />
      </Modal>
    </>
  );
}
