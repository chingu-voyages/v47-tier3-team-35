"use client";

import { Stack, Box, Paper } from "@mui/material";
import FoodImg from "../components/foodInfo/FoodImg";
import FoodInfo from "../components/foodInfo/FoodInfo";
import FoodActivity from "../components/foodActivity/FoodActivity";
import FoodInventory from "../components/foodInventory/FoodInventory";
import useIncrementFoodData from "@/hooks/useIncrementFoodData";
import { FoodDataType } from "../page";

export interface ResponsiveLayout {
  foodData: FoodDataType;
  spaces: string[];
  userId: string;
}

const DesktopLayout = ({ foodData, spaces, userId }: ResponsiveLayout) => {
  const { currentFoodData, currentLogs, handleIncrement } = useIncrementFoodData(foodData);

  return (
    <>
      <Stack direction="row" gap="12" className={"h-[42rem] pb-12"}>
        <Box className="item-details flex flex-col w-1/2 pe-6">
          <Box className="img-container relative h-1/2">
            {/* Food Img */}
            <FoodImg
              title={currentFoodData.title || ""}
              imgUrl={currentFoodData.image?.url || ""}
            />
          </Box>

          {/* Food Info */}
          <FoodInfo
            foodData={foodData}
            spaces={spaces}
            userId={userId}
            handleIncrement={handleIncrement}
          />
        </Box>

        {/* Food Activity */}

        <Box className="w-1/2 ps-6">
          <FoodActivity foodLogs={currentLogs} />
        </Box>
      </Stack>

      {/* Food Inventory */}

      <Paper className="w-full flex flex-col pt-12 pb-8 md:min-h-[18rem] md:box-content md:-ms-12 md:px-12">
        <FoodInventory
          foodDataSingle={currentFoodData}
          handleIncrement={handleIncrement}
        />{" "}
      </Paper>
    </>
  );
};

export default DesktopLayout;