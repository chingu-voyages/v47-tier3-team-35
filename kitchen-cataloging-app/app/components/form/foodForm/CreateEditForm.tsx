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
import { DndFileProvider } from "../inputs/innerComponents/dnd/DnDProvider";
import { useEffect, useState } from "react";
import { getFood } from "@/actions/food/actions";
import { ExpirationDateProvider } from "../inputs/wrapperInputs/expirationDate/ExpirationDateProvider";
import FormSubmitWrapper from "../components/FormSubmitWrapper";
import { FormActionBtns, FormCloseBtn } from "../components/FormActionBtns";
import FormHeader from "../components/FormHeader";
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
                  {children}
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
    if (type === "create") return;
    setLoading(true);
    getFood({ foodId: itemId })
      .then((res) => {
        setItemData(res);
        setLoading(false);
      })
      .catch((err) => setError(true));
  }, [itemId, type]);

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
        <Box className="flex flex-col w-full">
          <CreateEditFormWrappers itemData={itemData}>
            <FormSubmitWrapper>
              {/*Close Btn*/}
              <FormCloseBtn onClose={handleClose} />
              {/* Heading */}
              <FormHeader
                header={`${type.slice(0, 1).toUpperCase()}${type.slice(
                  1
                )} Item`}
              />
              {!loading && itemData && <FormInputs />}
              <FormActionBtns onClose={handleClose} />
            </FormSubmitWrapper>
          </CreateEditFormWrappers>
        </Box>
      </Modal>
    </>
  );
}
