import { Box } from "@mui/material"

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
    img: `https://source.unsplash.com/random`,
    labels: ["It's beer"],
    logs: [{price: 10.99, amount: 10, totalCost: 109.90}, {price: 10.99, amount: -1, totalCost: -10.99}]
}

interface Food {
  params: { spaceId: string; foodId: string };
  searchParams: { spaceTitle: string };
}


const Food = ({ params, searchParams }: Food) => {

    const { spaceId, foodId } = params;
    const spaceTitle = searchParams.spaceTitle;
    const food = tempFoodData;

    return (
      <>
        <NavigationDepthBar
          items={[
            { routePath: "dashboard", title: "Dashboard" },
            { routePath: "spaces", title: "Spaces" },
            {
              routePath: `${spaceId}`,
              title: `${spaceTitle}`,
            },
            {
              routePath: `${foodId}?spaceTitle=${spaceTitle}`,
              title: `${food.description}`,
            },
          ]}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { base: "1fr", lg: "repeat(2, fr)" },
            gap: 1,
            gridTemplateRows: { base: "auto", lg: "repeat(3, fr)" },
            gridTemplateAreas: {
              base: `"img" "info" "inventory" "activity"`,
              lg: `"img activity" "info activity" "inventory inventory"`,
            },
          }}
        >
          <Box sx={{ BoxArea: "img" }}>
            <FoodImg />
          </Box>
          <Box sx={{ gridArea: "info" }}>
            <FoodInfo />
          </Box>
          <Box sx={{ gridArea: "activity" }}>
            <FoodActivity />
          </Box>
          <Box sx={{ gridArea: "inventory" }}>
            <FoodInventory />
          </Box>
        </Box>
      </>
    );
};

export default Food;
