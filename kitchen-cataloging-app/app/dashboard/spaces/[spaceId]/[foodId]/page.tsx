import { Box, Typography } from "@mui/material"

import FoodImg from "./components/FoodImg";
import FoodInfo from "./components/FoodInfo";
import FoodActivity from "./components/FoodActivity";
import FoodInventory from "./components/FoodInventory";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
// import { useParams } from "next/navigation";

const tempFoodData = {
    description: "Beer",
    price: 10.99,
    amount: 9,
    category: "Beverage",
    threshold: 5,
    expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30 days from now
    img: ``,
    labels: ["It's beer"],
    logs: [{ price: 10.99, amount: 10, totalCost: 109.90 }, { price: 10.99, amount: -1, totalCost: -10.99 }],
    roomTitle: 'Kitchen',
}

interface Food {
  params: { spaceId: string; foodId: string };
}


const Food = ({ params }: Food) => {

    const food = tempFoodData;

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
              title: `${food.description}`,
            },
          ]}
        />
        <Box
          className="w-full max-w-[70rem] mx-auto"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "100%", md: "repeat(2, 50%)" },
            gap: 1,
            gridTemplateRows: { xs: "repeat(4, 1fr)", md: "repeat(3, 1fr)" },
            gridTemplateAreas: {
              xs: `"img" "info" "inventory" "activity"`,
              md: `"img activity" "info activity" "inventory inventory"`,
            },
          }}
        >
          <Box
            className={
              "border h-[30vh] min-h-[15rem] w-full  max-w-[30rem] p-3 mx-auto"
            }
            sx={{ BoxArea: "img" }}
          >
            <FoodImg imgUrl={food.img} description={food.description} />
          </Box>
          <Box
            className={
              "border h-[30vh] min-h-[15rem] w-full max-w-[30rem] p-3 mx-auto"
            }
            sx={{ gridArea: "info" }}
          >
            <FoodInfo
              space={food.roomTitle}
              description={food.description}
              price={food.price}
              category={food.category}
              labels={food.labels}
            />
          </Box>
          <Box className={"border p-3"} sx={{ gridArea: "activity" }}>
            <FoodActivity />
          </Box>
          <Box className={"border p-3"} sx={{ gridArea: "inventory" }}>
            <FoodInventory />
          </Box>
        </Box>
      </>
    );
};

export default Food;
