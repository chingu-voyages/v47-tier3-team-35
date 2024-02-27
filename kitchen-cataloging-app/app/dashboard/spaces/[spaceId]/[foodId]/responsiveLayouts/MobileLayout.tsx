"use client";

import { Stack, Box, Paper } from "@mui/material";
import FoodImg from "../components/foodInfo/FoodImg";
import FoodInfo from "../components/foodInfo/FoodInfo";
import FoodActivity from "../components/foodActivity/FoodActivity";
import FoodInventory from "../components/foodInventory/FoodInventory";

import { FoodDataType } from "../page";
import { ResponsiveLayout } from "./DesktopLayout";
import useIncrementFoodData from "@/hooks/useIncrementFoodData";

const MobileLayout = ({ foodData, spaces, userId }: ResponsiveLayout) => {
  const { currentFoodData, currentLogs, handleIncrement } = useIncrementFoodData(foodData);

  return (
    <>
      <Stack gap="2" className={"relative"}>
        {/* Food Img */}
        <Box className="img-container relative h-[17.5rem] w-full">
          <FoodImg
            title={currentFoodData.title || ""}
            imgUrl={currentFoodData.image?.url || ""}
          />
        </Box>
        {/* Food Info */}
        <Box className="info-container bg-default-sys-light-surface-container -mt-7 pt-2 mb-9 z-10 rounded-tl-[2rem] w-full px-5">
          <FoodInfo
            foodData={currentFoodData}
            spaces={spaces}
            userId={userId}
            handleIncrement={handleIncrement}
          />
        </Box>

        {/* Food Inventory */}

        <Box className="px-5 w-full mb-9">
          <Paper className="flex flex-col pt-5 pb-8 w-full">
            <FoodInventory
              foodDataSingle={currentFoodData}
              handleIncrement={handleIncrement}
            />{" "}
          </Paper>
        </Box>

        {/* Food Activity */}

        <Box className="w-full px-5 mb-9">
          <FoodActivity foodLogs={currentLogs} />
        </Box>
      </Stack>
    </>
  );
};

export default MobileLayout;
