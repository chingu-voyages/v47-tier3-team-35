import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box, Select, InputLabel, FormControl, MenuItem } from "@mui/material";
import { FoodType } from "@/prisma/mock/mockData";
import FormInputs from "./components/FormInputs";
import useWindowWidth from "@/hooks/useWindowWidth";
import { handleForm } from "./actions/CreateEditServerAction";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

interface CreateEditForm {
  children: React.ReactNode;
  type: "create" | "edit";
  spaces: string[];
  itemData?: FoodType;
}

export default function CreateEditForm({
  children,
  type,
  spaces,
  itemData,
}: CreateEditForm) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box className={"cursor-pointer"} onClick={handleClickOpen}>
        {children}
      </Box>
      <Dialog
        className="max-w-[900px] bg-default-sys-light-surface-container-low"
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <IconButton
          className="absolute top-2 right-2"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon className="text-black"></CloseIcon>
        </IconButton>
        <form
          action={handleForm}
          onSubmit={() => handleClose()}
          className="p-10 flex flex-col bg-default-sys-light-surface-container-low"
        >
          <FormInputs
            type={type}
            spaces={spaces}
            itemData={itemData}
            onClose={handleClose}
            handleForm={handleForm}
          />
        </form>
      </Dialog>
    </React.Fragment>
  );
}
