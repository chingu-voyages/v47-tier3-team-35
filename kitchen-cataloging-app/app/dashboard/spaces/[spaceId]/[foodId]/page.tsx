import { Box, Stack } from "@mui/material";
import { auth } from "@clerk/nextjs";
import DesktopLayout from "./responsive-layouts/DesktopLayout"
import MobileLayout from "./responsive-layouts/MobileLayout";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import { FoodType, LogType } from "@/prisma/mock/mockData";
import Paper from "@mui/material/Paper";
import { getSingleFood } from "./actions/crud/getSingleFood";
// import { useParams } from "next/navigation";
// Types for data
export type LogDataType = Omit<LogType, "id" | "userId" | "foodId">;
export type FoodDataType = Omit<
  FoodType,
  "id" | "createdAt" | "updatedAt" | "user" | "userId" | "room" | "roomId"
> & { logs: LogDataType[] };

const tempFoodData: FoodDataType[] = [
  {
    title: "Beer",
    price: 10.99,
    amount: 9,
    labels: ["Beverage", "Alcohol"],
    threshold: 5,
    expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30 days from now
    image: {
      s3ObjKey: "donuts.jpg",
      url: null,
    },
    description: "It's beer",
    roomTitle: "Kitchen",
    logs: [
      {
        price: 10.99,
        amount: 10,
        // totalCost: 109.9,
        timestamp: new Date(Date.now()),
      },
      {
        price: 10.99,
        amount: -1,
        // totalCost: -10.99,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      },
    ],
  },
];



interface Food {
  params: { spaceId: string; foodId: string };
}

const Food = async({ params }: Food) => {
  // const food: FoodDataType = tempFoodData[0];

  const { spaceId, foodId } = params;
  const { userId } = auth();
  // Uses room name to find room based on the user id. Also includes foods that matches that room name
  const foodData = await getSingleFood({ foodId: foodId, userId: userId });
  //guard clause in case no data is returned
  if (!foodData) return <>No data found for this item</>;

    return (
      <Box className="max-w-[1536px] w-full mx-auto md:px-12">
        <NavigationDepthBar
          items={[
            { routePath: "dashboard", title: "Dashboard" },
            { routePath: "spaces", title: "Spaces" },
            {
              routePath: `${spaceId}`,
              title: `${foodData.roomTitle}`,
            },
            {
              routePath: `${foodId}`,
              title: `${foodData.title}`,
            },
          ]}
        />
        {/* Desktop Layout */}
        <Box className="desktop-layout hidden md:block pt-9">
          <DesktopLayout foodData={foodData} />
        </Box>
        {/* Mobile Layout */}
        <Box className="mobile-layout md:hidden">
          <MobileLayout foodData={foodData} />
        </Box>
      </Box>
    );
};

export default Food;
