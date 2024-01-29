import { Box, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface IncrementButton {
    direction: '+' | '-';
    onClick: (args: any) => any;
    args: any;
    size: number;
}

const IncrementButton = ({ direction, onClick, args, size }: IncrementButton) => {
    
    // const classList = `rounded-full shadow w-${size} aspect-square`

  return (
    <IconButton className="bg-slate-300 shadow-[0px_1px_2px_gray] hover:bg-slate-200" size={"small"} onClick={() => onClick(args)}>
      {direction === "+" ? (
        <AddIcon className={`text-sm`} />
      ) : (
        <RemoveIcon className={`text-sm`} />
      )}
    </IconButton>
  );
}

export default IncrementButton
