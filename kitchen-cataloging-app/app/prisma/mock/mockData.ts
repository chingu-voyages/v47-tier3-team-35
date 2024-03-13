import { Food, Room, Log, User, FoodItemVersion } from "@prisma/client";
export function isErrorType(e: any): e is ErrorType {
  return !!e.error;
}
export type RoomType = Room;
export type FoodType = Food;
export type LogType = Log;
export type UserType = User;
export type PrismaUserResult = User & {
  foods: {
    log: LogType[];
  }[];
  rooms: RoomType[];
};

export type ErrorType = {
  error: {
    status: string;
    message: string;
  };
};
type SeedDataResult = {
  logs: Omit<LogType, "userId" | "id" | "userId" | "foodId">[];
  rooms: Omit<RoomType, "userId" | "id">[];
  foods: Omit<FoodType, "userId" | "id" | "roomTitle" | "roomId">[];
  foodVers: Omit<FoodItemVersion, "foodId" | "id" | "userId">[];
};
const rooms = [
  {
    title: "My Refrigerator",
    itemCount: 0,
    createdAt: new Date(Date.now()),
  },
  {
    title: "My Secret Snack Stash",
    itemCount: 0,
    createdAt: new Date(Date.now()),
  },
];
const foods = [
  {
    title: "Beer",
    amount: 3,
    labels: ["Beverage"],
    description: "It's beer",
  },
  {
    title: "Donuts",
    amount: 3,
    labels: ["Pastry"],
    description: "Original glazed",
  },
  {
    title: "5-Gallon bucket of Cheese Puffs",
    amount: 3,
    labels: ["Snack"],
    description: "Don't ask",
  },
].map((food) => ({
  ...food,
  threshold: 0,
  image: {
    s3ObjKey: "donuts.jpg",
    url: "",
  },
}));
const foodVers = [
  {
    quantity: 1,
    price: 8.0,
    expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 50), //50 days from now
  },
  {
    quantity: 2,
    price: 6.5,
    expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), //10 days from now
  },
];
const logs = [
  {
    price: 10.99, //limit to 2 decimal places
    amount: 20,
  },
  {
    price: 11.99, //limit to 2 decimal places
    amount: 10,
  },
  {
    price: 1.99, //limit to 2 decimal places
    amount: 10,
  },
];
export const mockData = (): SeedDataResult => {
  const newFoods = Array(10)
    .fill(foods)
    .flat()
    .map((val) => ({
      ...val,
    }));
  const newFoodVers = Array(3)
    .fill(foodVers)
    .flat()
    .map((val) => ({
      ...val,
    }));
  const newLogs = Array(40)
    .fill(logs)
    .flat()
    .map((val) => {
      return {
        ...val,
      };
    });
  return {
    logs: newLogs,
    rooms,
    foods: newFoods,
    foodVers: newFoodVers,
  };
};
