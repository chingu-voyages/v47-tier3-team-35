'use client'

import { Stack, Typography, Box, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Pill from "@/components/UI/Pill";
import { Variant } from "@mui/material/styles/createTypography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface FoodInfo {
  space: string;
  description: string;
  price: number;
  category: string;
  labels: string[];
  
}

const FoodInfo = ({ space, description, price, category, labels }: FoodInfo) => {
  
  const priceDollars = price.toString().split(".")[0];
  const priceCents = price.toString().split(".")[1];

  const handleIncrement = (direction: '+' | '-') => {
    console.log(direction)
  }

  // room name, food name, price, description, tags
  // editable
  return (
    <>
      <Stack direction={"row"} className="justify-between items-start">
        {/* title/space */}
        <Stack direction={"column"} className="items-start">
          <Typography variant="caption">{space}</Typography>
          <Typography variant={"subtitle2"}>{description}</Typography>
        </Stack>
        {/* Price */}
        <Stack direction={"column"} className="items-end">
          <Typography variant="caption">Price</Typography>
          <Stack direction={"row"} className="items-start">
            <Typography variant={"subtitle2"}>${priceDollars}</Typography>
            <Typography variant={"body2"} className="pt-1">
              {priceCents}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* Icons + add/subtract buttons */}
      <Stack direction={"row"} className={"w-full justify-between mt-3 px-1"}>
        <Stack direction={"row"} className={"gap-2"}>
          <ShoppingCartIcon color={"primary"} />
          <EditIcon color={"secondary"} />
          <DeleteIcon color={"error"} />
        </Stack>
        <Stack direction={"row"} className={"w-20 justify-end gap-2"}>
          <IconButton
            className="bg-slate-300 shadow-[0px_1px_2px_gray] hover:bg-slate-200"
            size={"small"}
            onClick={() => console.log("click")}
          >
            <AddIcon className={`text-sm`} />
          </IconButton>
          <IconButton
            className="bg-slate-300 shadow-[0px_1px_2px_gray] hover:bg-slate-200"
            size={"small"}
            onClick={() => console.log("click")}
          >
            <RemoveIcon className={`text-sm`} />
          </IconButton>
        </Stack>
      </Stack>
      {/* Pills -- category -- these might end up being mapped */}
      <Stack direction={"row"} className="w-full items-center mt-5">
        <Pill text={category} textVariant={"body3" as Variant}></Pill>
      </Stack>
      {/*  */}
      <Typography variant={'body3'} className="mt-5 text-slate-400">{labels.join(",")}</Typography>
    </>
  );
}

export default FoodInfo;
