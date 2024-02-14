import { Stack, Box, Paper } from "@mui/material";
import FoodImg from "../components/FoodImg";
import FoodInfo from "../components/FoodInfo";
import FoodActivity from "../components/FoodActivity";
import FoodInventory from "../components/FoodInventory";

import { FoodDataType } from "../page";

const MobileLayout = ({ foodData, userId }: { foodData: FoodDataType; userId: string; }) => {
  const food = foodData;

  return (
    <>
      <Stack gap="2" className={"relative"}>
        {/* Food Img */}
        <Box className="img-container relative h-[17.5rem] w-full">
          <FoodImg
            title={food.title || ""}
            imgUrl={food.image?.url || ""}
          />
        </Box>
        {/* Food Info */}
        <Box className="info-container bg-default-sys-light-surface-container -mt-7 pt-2 mb-9 z-10 rounded-tl-[2rem] w-full px-5">
          <FoodInfo foodData={foodData} userId={userId} />
        </Box>

        {/* Food Inventory */}

        <Box className="px-5 w-full mb-9">
          <Paper className="flex flex-col pt-5 pb-8 w-full">
            <FoodInventory foodDataSingle={foodData} />{" "}
          </Paper>
        </Box>

        {/* Food Activity */}

        <Box className="w-full px-5 mb-9">
          <FoodActivity foodLogs={food.logs} />
        </Box>
      </Stack>
    </>
  );
};

export default MobileLayout;
