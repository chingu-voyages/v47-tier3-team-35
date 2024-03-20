import { Box, Button, IconButton } from "@mui/material";
import { FormProps } from "../types/types";
import CloseIcon from "@mui/icons-material/Close";
export const FormCloseBtn = ({
  onClose,
}: {
  onClose: FormProps<any>["onClose"];
}) => {
  return (
    <IconButton
      className="absolute top-2 right-2"
      onClick={() => {
        if (onClose) onClose();
      }}
      aria-label="close"
    >
      <CloseIcon className="text-default-ref-neutral-neutral50" />
    </IconButton>
  );
};
export const FormActionBtns = ({
  onClose,
}: {
  onClose: FormProps<any>["onClose"];
}) => {
  return (
    <Box className="flex flex-row justify-end gap-4 py-6">
      <Button
        type="button"
        className="rounded-full"
        variant="outlined"
        onClick={() => (onClose ? onClose() : () => {})}
      >
        Cancel
      </Button>
      <Button type="submit" className="rounded-full" variant="contained">
        Save
      </Button>
    </Box>
  );
};
