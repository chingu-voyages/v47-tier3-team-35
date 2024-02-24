import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { auth } from "@clerk/nextjs";
import DesktopLayout from "./layouts/DesktopLayout";
import MobileLayout from "./layouts/MobileLayout";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import { FoodType, LogType } from "@/prisma/mock/mockData";
import Paper from "@mui/material/Paper";
import { getSingleFood } from "@/actions/food/crud/getSingleFood";
import { getIncrementFood } from "@/actions/food/actions";
// import { useParams } from "next/navigation";
// Types for data
export type LogDataType = Omit<LogType, "id" | "userId" | "foodId">;
export type FoodDataType = FoodType & { logs: LogDataType[] };

interface Food {
  params: { spaceId: string; foodId: string };
}

const Food = async ({ params }: Food) => {
  const { spaceId, foodId } = params;
  const { userId } = auth();
  // Uses room name to find room based on the user id. Also includes foods that matches that room name
  const data = await getSingleFood({ foodId: foodId, userId: userId });
  const storedFoodData = data?.foodData;
  const spaces = data?.spaces.map((space) => space.title) || [];
  //guard clause in case no data is returned
  if (!storedFoodData) return <>No data found for this item</>;
  if (!userId) return <>You must log in to view this page</>;
  return (
    <Box className="max-w-[1536px] w-full mx-auto md:px-12">
      <NavigationDepthBar
        items={[
          { routePath: "dashboard", title: "Dashboard" },
          { routePath: "spaces", title: "Spaces" },
          {
            routePath: `${spaceId}`,
            title: `${storedFoodData.roomTitle}`,
          },
          {
            routePath: `${foodId}`,
            title: `${storedFoodData.title}`,
          },
        ]}
      />
      {/* Desktop Layout */}
      <Box className="desktop-layout hidden md:block pt-9">
        <DesktopLayout
          foodData={storedFoodData}
          spaces={spaces || []}
          userId={userId}
        />
      </Box>
      {/* Mobile Layout */}
      <Box className="mobile-layout md:hidden">
        <MobileLayout
          foodData={storedFoodData}
          spaces={spaces || []}
          userId={userId}
        />
      </Box>
    </Box>
  );
};

export default Food;
