import { Stack, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

interface Pill {
  text: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  textVariant?: Variant;
}

// Example usage: You will need to import { Variant } from "@mui/material/styles/createTypography" to pass a valid text variant; 
// <Pill text={category} textVariant={"body3" as Variant}></Pill>

const Pill = ({text, borderColor, bgColor, textColor, textVariant}: Pill) => {
  
  const classNames = `
  border-${borderColor ? borderColor : "slate-400"} 
  text-${textColor ? textColor : "black"} 
  bg-${bgColor ? bgColor : "white"}
  border px-3 py-1 rounded-[1rem] justify-center`;
  
  return (
    <Stack
      className={classNames}
    >
      <Typography variant={textVariant ? textVariant : 'body3'}>{text}</Typography>
    </Stack>
  );
}

export default Pill
