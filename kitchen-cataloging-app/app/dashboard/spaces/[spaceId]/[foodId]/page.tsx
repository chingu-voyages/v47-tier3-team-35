import { Box, Typography } from "@mui/material";

import FoodImg from "./components/FoodImg";
import FoodInfo from "./components/FoodInfo";
import FoodActivity from "./components/FoodActivity";
import FoodInventory from "./components/FoodInventory";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import { FoodType, LogType } from "@/prisma/mock/mockData";
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
        timestamp: new Date(Date.now()),
      },
      {
        price: 10.99,
        amount: -1,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      },
    ],
  },
];

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
        className="w-full max-w-[72rem] mx-auto md:mt-3"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "100%", md: "repeat(2, 50%)" },
          gap: { md: "1rem" },
          gridTemplateRows: { xs: "repeat(14, 7rem)", md: "repeat(3, 1fr)" },
          gridTemplateAreas: {
            xs: `"img" "img" "img" "img" "info" "info" "info" "inventory" "inventory" "inventory" "activity" "activity" "activity"`,
            md: `"img activity" "info activity" "inventory inventory"`,
          },
          justifyContent: "space-between",
        }}
      >
        <Box
          className={" w-full max-w-[34rem] mx-auto md:p-3 md:min-h-[20rem]"}
          sx={{
            BoxArea: "img",
            height: { xs: "28rem", md: "35vh" },
          }}
        >
          <FoodImg
            description={food.description ? food.description : ""}
            imgUrl={food.image?.url ? food.image.url : ""}
          />
        </Box>
        <Box
          className={
            "w-full max-w-[34rem] py-2 px-4 mx-auto md: min-h-[18rem] "
          }
          sx={{
            gridArea: "info",
            height: { md: "35vh" },
          }}
        >
          <Box
            className="h-[4rem] w-full -mt-[2rem] -ms-[2rem] bg-default-sys-light-surface-container md:hidden"
            sx={{
              minWidth: "calc(100% + 4rem)",
              borderRadius: "2rem 2rem 0 0",
            }}
          ></Box>
          <FoodInfo
            space={food.roomTitle}
            title={food.title}
            description={food.description ? food.description : ""}
            price={food.price}
            labels={food.labels}
          />
        </Box>
        <Box
          className={"w-full max-w-[34rem] mx-auto md:p-3"}
          sx={{
            gridArea: "activity",
            height: { xs: "40vh", md: "39rem" },
            mt: { xs: "1rem", md: "0" },
          }}
        >
          <FoodActivity foodLogs={food.logs} />
        </Box>
        <Box
          //
          className={
            "max-w-[70rem] w-full px-0 pb-6 -mt-3 mx-auto md: min-h-[20rem]"
          }
          sx={{
            gridArea: "inventory",
            height: { xs: "40vh", md: "35vh" },
          }}
        >
          <FoodInventory foodData={tempFoodData} />
        </Box>
      </Box>
    </>
  );
};

export default Food;
