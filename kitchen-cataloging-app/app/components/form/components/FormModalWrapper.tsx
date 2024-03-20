import { Box, Modal, ModalProps } from "@mui/material";
import React from "react";

export default function FormModalWrapper(
  props: Omit<ModalProps, "children"> & {
    children: React.ReactNode;
    innerContainerClassName?: string;
  }
) {
  const modalProps = { ...props };
  const innerStyles = modalProps.innerContainerClassName;
  if (modalProps.children) delete modalProps.children;
  if (modalProps.innerContainerClassName)
    delete modalProps.innerContainerClassName;
  return (
    <Modal
      className="flex m-auto w-full h-full sm:px-[10vw] sm:py-[5vh] justify-center"
      {...props}
    >
      <Box className="flex flex-col w-full h-full md:max-h-[750px] md:max-w-screen-xl my-auto">
        <Box className="relative flex flex-col w-full h-full bg-default-sys-light-surface-container-low pt-6 px-10 pb-0 overflow-y-auto">
          <Box className={innerStyles || `flex flex-col w-full md:m-auto`}>
            {props.children}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
