import { Stack, Typography } from "@mui/material";

interface Pill {
    text: string;
}

const Pill = ({text}: Pill) => {
  return (
    <Stack
      className={
        "border-slate-400 border px-2 py-1 rounded-[8px] justify-center"
      }
    >
      <Typography className="text-sm">{text}</Typography>
    </Stack>
  );
}

export default Pill
