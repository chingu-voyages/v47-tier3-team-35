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

  const iconClassList = 'h-8 w-8';
  // room name, food name, price, description, tags
  // editable
  return (
    <>
      <Stack direction={"row"} className="justify-between items-start pb-3">
        {/* title/space */}
        <Stack direction={"column"} className="items-start">
          <Typography
            variant="body2"
            className={"text-default-ref-neutral-neutral50"}
          >
            {space}
          </Typography>
          <Typography
            variant={"h3"}
            className={"text-default-ref-neutral-neutral30"}
          >
            {title}
          </Typography>
        </Stack>
        {/* Price */}
        <Stack direction={"column"} className="items-end">
          <Typography variant="body2" className={"text-slate-500"}>
            Price
          </Typography>
          <Stack direction={"row"} className="items-start">
            <Typography
              variant={"h3"}
              className={"text-default-ref-neutral-neutral30"}
            >
              ${priceDollars}
            </Typography>
            <Typography
              variant={"subtitle1"}
              className={"text-default-ref-neutral-neutral30 align-top -mt-1"}
            >
              {priceCents}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* Icons + add/subtract buttons */}
      <Stack
        direction={"row"}
        className={"w-full justify-between mt-3 px-1 pb-3"}
      >
        <Stack direction={"row"} className={"gap-2"}>
          <AddShoppingCartOutlinedIcon
            color={"primary"}
            className={`${iconClassList}`}
          />
          <EditOutlinedIcon
            color={"secondary"}
            className={`${iconClassList}`}
          />
          <DeleteForeverOutlinedIcon
            color={"error"}
            className={`${iconClassList}`}
          />
        </Stack>
        <Stack direction={"row"} className={"w-20 justify-end gap-2"}>
          <IconButton
            className={`bg-default-ref-neutral-neutral90 text-default-ref-neutral-neutral30 shadow-[0px_1px_2px_gray] hover:bg-default-ref-neutral-neutral95 ${iconClassList}`}
            size={"small"}
            onClick={() => console.log("click")}
          >
            <AddIcon className={`text-3xl`} />
          </IconButton>
          <IconButton
            className={`bg-default-ref-neutral-neutral90 text-default-ref-neutral-neutral30 shadow-[0px_1px_2px_gray] hover:bg-default-ref-neutral-neutral95 ${iconClassList}`}
            size={"small"}
            onClick={() => console.log("click")}
          >
            <RemoveIcon className={`text-3xl`} />
          </IconButton>
        </Stack>
      </Stack>
      {/* Pills -- category -- these might end up being mapped */}
      <Stack direction={"row"} className="w-full items-center my-5 gap-2 pb-3">
        {labels.map((label, i) => (
          <Pill
            key={i}
            text={label}
            borderColor="rgb(101, 107, 113)" //default-sys-light-outline
            textColor="rgb(57, 62, 68)" //default-sys-light-on-surface-variant
            textVariant={"body3" as Variant}
          ></Pill>
        ))}
      </Stack>
      {/*  */}
      <Typography
        variant={"body1"}
        className="text-default-ref-neutral-neutral30 mt-5"
      >
        {description}
      </Typography>
    </>
  );
}

export default FoodInfo;
