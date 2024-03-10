"use client";
import { Button, ButtonProps, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useWindowWidth from "@/hooks/useWindowWidth";
const defaultProps = {
  disableTextHide: false,
};
const AddItemBtn = (
  props: ButtonProps & {
    responsive?: {
      disableTextHide?: boolean;
    };
  }
) => {
  const responsive = props.responsive || defaultProps;
  //we do this so we can easily spread the values of the button
  const btnProps = { ...props };
  if (btnProps.responsive) delete btnProps.responsive;
  const smallWidth = useWindowWidth(400);
  const noTextClasses = "aspect-square pl-0 pr-0 min-w-10";
  const textClasses = "pl-4 pr-6";
  const spacingClasses =
    "space-x-1.5 py-2.5 sm:space-x-2 sm:py-2.5 sm:pl-5 sm:pr-7 md:py-3 lg:space-x-2.5 lg:py-4 lg:pl-6 lg:pr-8";
  const btnText = (
    <Typography
      noWrap
      variant={"button"}
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide leading-4 sm:leading-5 md:leading-6 lg:leading-8"
      sx={{
        textTransform: "none",
      }}
    >
      Add Item
    </Typography>
  );
  return (
    <Button
      variant="contained"
      size="large"
      className={`font-medium rounded-full flex items-center ${spacingClasses} ${
        responsive.disableTextHide
          ? textClasses
          : smallWidth
          ? textClasses
          : noTextClasses
      }`}
      sx={{
        minHeight: "0",
        height: "fit-content",
      }}
      {...props}
    >
      <AddIcon className="text-6xl sm:text-8xl" />
      {responsive.disableTextHide ? btnText : smallWidth && btnText}
    </Button>
  );
};
export default AddItemBtn;
