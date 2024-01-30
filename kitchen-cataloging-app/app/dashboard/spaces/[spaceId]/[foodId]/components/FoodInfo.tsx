'use client'

import { Stack, Typography, Box, IconButton } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Pill from "@/components/UI/Pill";
import { Variant } from "@mui/material/styles/createTypography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface FoodInfo {
  space: string;
  title: string;
  description: string;
  price: number;
  labels: string[];
  
}

const FoodInfo = ({ title, space, description, price, labels }: FoodInfo) => {
  
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
          <Typography variant="caption" className={"text-slate-500"}>
            {space}
          </Typography>
          <Typography variant={"subtitle1"}>{title}</Typography>
        </Stack>
        {/* Price */}
        <Stack direction={"column"} className="items-end">
          <Typography variant="caption" className={"text-slate-500"}>
            Price
          </Typography>
          <Stack direction={"row"} className="items-start">
            <Typography variant={"subtitle1"}>${priceDollars}</Typography>
            <Typography variant={"body2"} className="pt-[0.33rem]">
              {priceCents}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* Icons + add/subtract buttons */}
      <Stack direction={"row"} className={"w-full justify-between mt-3 px-1"}>
        <Stack direction={"row"} className={"gap-2"}>
          <AddShoppingCartOutlinedIcon color={"primary"} />
          <EditOutlinedIcon color={"secondary"} />
          <DeleteForeverOutlinedIcon color={"error"} />
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
      <Stack direction={"row"} className="w-full items-center my-5 gap-2">
        {labels.map((label, i) => (
          <Pill
            key={i}
            text={label}
            borderColor="secondary.main"
            textColor="secondary.main"
            textVariant={"body3" as Variant}
          ></Pill>
        ))}
      </Stack>
      {/*  */}
      <Typography variant={"body3"} className="text-slate-600 italic mt-5">
        {description}
      </Typography>
    </>
  );
}

export default FoodInfo;
