import { useState } from "react";
import Creatable from "react-select/creatable";
import { Box } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import Close from "@mui/icons-material/Close";
// import { itemLabels } from "@/data/labels";

interface CreateSelect {
  defaultLabels?: string[];
  handleLabels: (val: string[]) => void;
  name?: string;
}

const CreateSelect = ({ defaultLabels, handleLabels, name }: CreateSelect) => {
  const [labels, setLabels] = useState(defaultLabels || []);
  //stringified labels
  const [labelsStr, setLabelsStr] = useState(JSON.stringify([]));

  return (
    <Box className="flex relative">
      <Creatable isClearable isMulti options={} onChange={} />
      <input
        aria-label="hidden"
        className="invisible w-0 h-0 absolute -z-10 p-0 m-0"
        value={labelsStr}
        name={name}
      />
    </Box>
  );
};

export default CreateSelect;
