import { Stack, Box, Paper } from "@mui/material";
import FoodImg from "../components/FoodImg";
import FoodInfo from "../components/FoodInfo";
import FoodActivity from "../components/FoodActivity";
import FoodInventory from "../components/FoodInventory";

import { FoodDataType } from "../page";

const MobileLayout = ({ foodData }: { foodData: FoodDataType[] }) => {
  const food = foodData[0];

  return (
    <>
      <Stack gap="2" className={"relative"}>
        {/* Food Img */}
        <Box className="img-container relative h-[17.5rem] w-full">
          <FoodImg
            description={food.description ? food.description : ""}
            imgUrl={food.image ? food.image : ""}
          />
        </Box>
        {/* Food Info */}
        <Box className="info-container bg-default-sys-light-surface-container -mt-7 pt-2 mb-9 z-10 rounded-tl-[2rem] w-full px-5">
          <FoodInfo
            space={food.roomTitle}
            title={food.title}
            description={food.description ? food.description : ""}
            price={food.price}
            labels={food.labels}
          />
        </Box>

        {/* Food Inventory */}

        <Box className="px-5 w-full mb-9">
          <Paper className="flex flex-col pt-5 pb-8 w-full">
            <FoodInventory foodData={foodData} />{" "}
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
