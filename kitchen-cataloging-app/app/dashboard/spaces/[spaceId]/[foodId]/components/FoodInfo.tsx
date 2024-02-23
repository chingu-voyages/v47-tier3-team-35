"use client";

import { useState } from "react";

import { Stack, Typography, Box, IconButton } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Pill from "@/components/UI/Pill";
import { Variant } from "@mui/material/styles/createTypography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CreateEditForm from "@/components/form/create-edit-form/CreateEditForm";
import { FoodDataType } from "../page";
import { FoodType } from "@/prisma/mock/mockData";
import { getIncrementFood } from "@/actions/food/actions";

interface FoodInfo {
  foodData: FoodDataType;
  spaces: string[];
  userId: string;
  handleIncrement: (num: number) => void;
}

const FoodInfo = ({ foodData, spaces, userId, handleIncrement }: FoodInfo) => {

  const { title, roomTitle, description, price, labels } = foodData;
  const priceDollars = price.toString().split(".")[0];
  const priceCents = price.toFixed(2).toString().split(".")[1];

  const [amount, setAmount] = useState(foodData.amount);

  const handleIncrement = async (num: number) => {
    // update optimistically
    const originalValue = amount;
    const newValue = amount + num;
    if (newValue > 0) {
      setAmount(newValue);
      try {
        const updateResponse = await getIncrementFood(foodData.id, newValue);
        console.log(updateResponse);
      } catch (err) {
        console.log(err);
        setAmount(originalValue);
      }
    }
  };

  const iconClassList = "h-9 w-9";
  // room name, food name, price, description, tags

  return (
    <Box className="">
      <Stack direction={"row"} className="justify-between items-start pt-6">
        {/* title/space */}

        <Stack direction={"column"} className="items-start">
          <Typography
            variant="body2"
            className={"text-default-ref-neutral-neutral50"}
          >
            {roomTitle}
          </Typography>
          <Typography
            variant={"h2"}
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
              variant={"h2"}
              className={"text-default-ref-neutral-neutral30"}
            >
              ${priceDollars}
            </Typography>
            <Typography
              variant={"h4"}
              className={"text-default-ref-neutral-neutral30 align-top"}
            >
              {priceCents}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* Icons + add/subtract buttons */}

      <Stack direction={"row"} className={"w-full justify-between my-3.5 px-1"}>
        <Stack direction={"row"} className={"gap-2"}>
          <AddShoppingCartOutlinedIcon
            color={"primary"}
            className={`${iconClassList}`}
          />
          <CreateEditForm
            type={"edit"}
            spaces={spaces}
            userId={userId}
            itemData={foodData as FoodType}
          >
            <EditOutlinedIcon
              color={"secondary"}
              className={`${iconClassList}`}
            />
          </CreateEditForm>
          <DeleteForeverOutlinedIcon
            color={"error"}
            className={`${iconClassList}`}
          />
        </Stack>
        <Stack direction={"row"} className={"justify-end gap-5"}>
          <IconButton
            className={`bg-default-ref-neutral-neutral90 text-default-ref-neutral-neutral30 shadow-[0px_1px_2px_gray] hover:bg-default-ref-neutral-neutral95 ${iconClassList}`}
            size={"medium"}
            onClick={() => handleIncrement(1)}
          >
            <AddIcon className={`text-3xl`} />
          </IconButton>
          <IconButton
            className={`bg-default-ref-neutral-neutral90 text-default-ref-neutral-neutral30 shadow-[0px_1px_2px_gray] hover:bg-default-ref-neutral-neutral95 ${iconClassList}`}
            size={"medium"}
            onClick={() => handleIncrement(-1)}
          >
            <RemoveIcon className={`text-3xl`} />
          </IconButton>
        </Stack>
      </Stack>

      {/* Pills -- category -- these might end up being mapped */}

      <Stack direction={"row"} className="w-full items-center gap-2.5 pt-2 flex-wrap">
        {labels.map((label, i) => (
          <Pill
            key={i}
            text={label}
            borderColor="rgb(101, 107, 113)" //default-sys-light-outline
            textColor="rgb(57, 62, 68)" //default-sys-light-on-surface-variant
            textVariant={"body1" as Variant}
          ></Pill>
        ))}
      </Stack>
      {/*  */}
      <Typography
        variant={"body1"}
        className="text-default-ref-neutral-neutral30 mt-8 ps-1"
      >
        {description}
      </Typography>
    </Box>
  );
};

export default FoodInfo;
