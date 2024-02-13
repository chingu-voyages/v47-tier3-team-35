import { Stack, Box, Paper } from "@mui/material";
import FoodImg from "../components/FoodImg";
import FoodInfo from "../components/FoodInfo";
import FoodActivity from "../components/FoodActivity";
import FoodInventory from "../components/FoodInventory";

import { FoodDataType } from "../page";

const DesktopLayout = ({ foodData, userId }: { foodData: FoodDataType; userId: string }) => {
    
    const food = foodData;

    return (
      <>
        <Stack direction="row" gap="12" className={"h-[42rem] pb-12"}>
          <Box className="item-details flex flex-col w-1/2 pe-6">
            <Box className="img-container relative h-1/2">
              {/* Food Img */}
              <FoodImg
                description={food.description ? food.description : ""}
                imgUrl={food.image?.url ? food.image.url : ""}
              />
            </Box>

            {/* Food Info */}
            <FoodInfo
              foodData={foodData}
              userId={userId}
            />
          </Box>

          {/* Food Activity */}

          <Box className="w-1/2 ps-6">
            <FoodActivity foodLogs={food.logs} />
          </Box>
        </Stack>

        {/* Food Inventory */}

        <Paper className="w-full flex flex-col pt-12 pb-8 md:min-h-[18rem] md:box-content md:-ms-12 md:px-12">
          <FoodInventory foodDataSingle={foodData} />{" "}
        </Paper>
      </>
    );
}

export default DesktopLayout;