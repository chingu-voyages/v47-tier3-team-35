import { Box, Stack } from "@mui/material"

import DesktopLayout from "./responsive-layouts/DesktopLayout"
import MobileLayout from "./responsive-layouts/MobileLayout";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import { FoodType, LogType } from "@/prisma/mock/mockData";
import Paper from "@mui/material/Paper";
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
      <Box className="max-w-[1536px] w-full mx-auto md:px-12">
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
        {/* Desktop Layout */}
        <Box className="desktop-layout hidden md:block pt-9">
          <DesktopLayout foodData={tempFoodData} />
        </Box>
        {/* Mobile Layout */}
        <Box className="mobile-layout md:hidden">
          <MobileLayout foodData={tempFoodData} />
        </Box>
      </Box>
    );
};

export default Food;
