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
// <Pill key={i} text={label} borderColor="secondary.main" textVariant={"body3" as Variant}></Pill>

const Pill = ({text, borderColor='black', bgColor='transparent', textColor='black', textVariant}: Pill) => {
  
  const classNames = `border px-3 py-1 rounded-[1rem] justify-center`;
  
  return (
    <Stack
      className='border px-3.5 py-1 rounded-[0.5rem] justify-center'
      sx={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        color: textColor
      }}
    >
      <Typography variant={textVariant ? textVariant : 'body4'}>{text}</Typography>
    </Stack>
  );
}

export default Pill
