import { Box, Typography } from "@mui/material"

import FoodImg from "./components/FoodImg";
import FoodInfo from "./components/FoodInfo";
import FoodActivity from "./components/FoodActivity";
import FoodInventory from "./components/FoodInventory";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import { FoodType, LogType } from "@/prisma/mock/mockData";
// import { useParams } from "next/navigation";
// Types for data 
export type LogDataType = Omit<LogType, "id" | "userId" | "foodId">
export type FoodDataType = Omit<FoodType, "id" | "createdAt" | "updatedAt" | "user" | "userId" | "room" | "roomId"> & { logs: LogDataType[] }

const tempFoodData: FoodDataType[] = [{
  title: "Beer",
  price: 10.99,
  amount: 9,
  labels: ["Beverage", "Alcohol"],
  threshold: 5,
  expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30 days from now
  image: ``,
  description: "It's beer",
  roomTitle: "Kitchen",
  logs: [
    {
      price: 10.99,
      amount: 10,
      totalCost: 109.9,
      timestamp: new Date(Date.now()),
    },
    {
      price: 10.99,
      amount: -1,
      totalCost: -10.99,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    },
  ],
}];

interface Food {
  params: { spaceId: string; foodId: string };
}


const Food = ({ params }: Food) => {

    const food: FoodDataType = tempFoodData[0];

    const { spaceId, foodId } = params;

    return (
      <>
        <NavigationDepthBar
          items={[
            { routePath: "dashboard", title: "Dashboard" },
            { routePath: "spaces", title: "Spaces" },
            {
              routePath: `${spaceId}`,
              title: `${food.roomTitle}`,
            },
            {
              routePath: `${foodId}`,
              title: `${food.title}`,
            },
          ]}
        />
        <Box
          className="w-full max-w-[72rem] mx-auto mt-3"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "100%", md: "repeat(2, 50%)" },
            gap: "1rem",
            gridTemplateRows: { xs: "repeat(4, 1fr)", md: "repeat(3, 1fr)" },
            gridTemplateAreas: {
              xs: `"img" "info" "inventory" "activity"`,
              md: `"img activity" "info activity" "inventory inventory"`,
            },
            justifyContent: "space-between",
          }}
        >
          <Box
            className={
              "h-[35vh] min-h-[20rem] w-full max-w-[34rem] p-3 mx-auto"
            }
            sx={{
              BoxArea: "img",
            }}
          >
            <FoodImg
              description={food.description ? food.description : ""}
              imgUrl={food.image ? food.image : ""}
            />
          </Box>
          <Box
            className={
              "h-[35vh] min-h-[18rem] w-full max-w-[34rem] py-2 px-4 mx-auto"
            }
            sx={{ gridArea: "info" }}
          >
            <FoodInfo
              space={food.roomTitle}
              title={food.title}
              description={food.description ? food.description : ""}
              price={food.price}
              labels={food.labels}
            />
          </Box>
          <Box
            className={"h-[39rem] p-3 w-full max-w-[34rem] mx-auto"}
            sx={{ gridArea: "activity" }}
          >
            <FoodActivity foodLogs={food.logs} />
          </Box>
          <Box
            //
            className={
              "h-[32vh] min-h-[20rem] max-w-[70rem] w-full pt-0 px-0 pb-6 -mt-3 mx-auto"
            }
            sx={{ gridArea: "inventory" }}
          >
            <FoodInventory 
              foodData={tempFoodData}
            />
          </Box>
        </Box>
      </>
    );
};

export default Food;
