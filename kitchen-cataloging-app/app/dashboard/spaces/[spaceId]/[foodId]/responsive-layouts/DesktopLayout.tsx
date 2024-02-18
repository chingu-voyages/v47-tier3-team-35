'use client'

import { Stack, Box, Paper } from "@mui/material";
import FoodImg from "../components/FoodImg";
import FoodInfo from "../components/FoodInfo";
import FoodActivity from "../components/FoodActivity";
import FoodInventory from "../components/FoodInventory";

import { FoodDataType } from "../page";
import useFoodData from "@/hooks/useFoodData";


export interface ResponsiveLayout {
  foodData: FoodDataType;
  spaces: string[];
  userId: string;
}

const DesktopLayout = ({ foodData, spaces, userId}: ResponsiveLayout) => {
    
  const { currentFoodData, handleIncrement } = useFoodData(foodData);

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
              foodData={currentFoodData}
              spaces={spaces}
              userId={userId}
              handleIncrement={handleIncrement}
            />
          </Box>

          {/* Food Activity */}

          <Box className="w-1/2 ps-6">
            <FoodActivity foodLogs={currentFoodData.logs} />
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
}

export default DesktopLayout;