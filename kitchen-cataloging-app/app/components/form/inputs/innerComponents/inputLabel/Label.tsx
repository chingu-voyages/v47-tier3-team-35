import { InputLabel } from "@mui/material";
const Label = ({ text, active }: { text: string; active?: boolean }) => {
  return (
    <InputLabel shrink focused={active}>
      {text}
    </InputLabel>
  );
};
export default Label;
