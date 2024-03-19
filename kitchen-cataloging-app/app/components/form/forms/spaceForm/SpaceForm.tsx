import { SpaceSuccessResult } from "@/actions/space/types/types";
import { Room } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import { FormProps } from "../../types/types";
import { ErrorMessage } from "@/utils/generateErrMessage";
import { getRoom } from "@/actions/space/actions";
import { Alert, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import FormModalWrapper from "../../components/FormModalWrapper";
import { FormActionBtns, FormCloseBtn } from "../../components/FormActionBtns";
import FormHeader from "../../components/FormHeader";
import SpaceFormWrappers from "./wrappers/SpaceFormWrappers";
import SpaceSubmitFormWrapper from "./wrappers/SpaceFormSubmitFormWrapper";
import SpaceFormInputs from "./components/SpaceFormInputs";
import FormLoading from "../../components/FormLoading";

export default function SpaceForm({
  children,
  actionType,
  itemId,
  defaultData,
}: Omit<FormProps<Partial<Room>, SpaceSuccessResult>, "children"> & {
  children: (props: { handleOpen: () => void }) => React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [success, setSuccess] = useState<SpaceSuccessResult | null>(null);
  const [itemData, setItemData] = useState<Partial<Room> | null>(
    defaultData || null
  );
  const setErrFunc = (e: ErrorMessage) => {
    setError(e);
    setSuccess(null);
  };
  const setSuccessFunc = (e: SpaceSuccessResult) => {
    setError(null);
    setSuccess(e);
  };
  const savedSuccessFunc = useCallback(setSuccessFunc, []);
  const savedErrFunc = useCallback(setErrFunc, []);
  const handleOpen = () => {
    setSuccess(null);
    setOpen(true);
  };
  const handleClose = (result?: SpaceSuccessResult) => {
    if (result) savedSuccessFunc(result);
    setOpen(false);
  };
  useEffect(() => {
    if (!itemId) return;
    if (actionType === "create" && open) return;
    setLoading(true);
    getRoom({ id: itemId, foodData: false })
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
  )} Space`;
  return (
    <>
      {children({ handleOpen })}
      {success && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          <Typography noWrap>
            {`Successfully ${
              actionType === "create" ? "added" : "updated"
            } a space called: ${success.result.title}`}
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
        <SpaceFormWrappers
          //we add this key here because we want to FORCE react
          //to unmount and re-mount the components
          //anew, when open or loading state changes
          //this way we pre-fill providers with new item data everytime
          //the modal is opened, and therefore keep form updated with
          //most recent values
          key={open.toString() + loading.toString()}
          itemData={itemData}
        >
          <SpaceSubmitFormWrapper spaceId={itemId} onClose={handleClose}>
            {loading && <FormLoading />}
            <SpaceFormInputs />
            <FormActionBtns onClose={handleClose} />
          </SpaceSubmitFormWrapper>
        </SpaceFormWrappers>
      </FormModalWrapper>
    </>
  );
}
