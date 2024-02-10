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
import FormInputs from "./create-edit-form-components/FormInputs";
import useWindowWidth from "@/hooks/useWindowWidth";

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
  type: 'create' | 'edit';
  spaces: string[];
  itemData?: FoodType;
}

export default function CreateEditForm({ children, type, spaces, itemData }: CreateEditForm) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForm = async(formData: FormData) => {
    console.log(formData)
  }

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
        <FormInputs
          type={type}
          spaces={spaces}
          itemData={itemData}
          onClose={handleClose}
          handleForm={handleForm}
        />
      </Dialog>
    </React.Fragment>
  );
}