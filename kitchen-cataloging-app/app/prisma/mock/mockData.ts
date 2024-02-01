import { Food, Room, Log, User} from "@prisma/client";
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
  logs: Omit<LogType, "userId" | "id">[];
  rooms: Omit<RoomType, "userId" | "id">[];
  foods: Omit<FoodType, "userId" | "id">[];
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
    price: 10.99,
    amount: 10,
    labels: ["Beverage"],
    expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30 days from now
    description: "It's beer",
    roomTitle: "Kitchen",
  },
  {
    title: "Donuts",
    price: 6.5,
    amount: 12,
    labels: ["Pastry"],
    expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), //10 days from now
    description: "Original glazed",
    roomTitle: "My Secret Snack Stash",
  },
  {
    title: "5-Gallon bucket of Cheese Puffs",
    price: 8.0,
    amount: 1,
    labels: ["Snack"],
    expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 50), //50 days from now
    description: "Don't ask",
    roomTitle: "My Secret Snack Stash",
  },
].map((food) => ({
  ...food,
  threshold: 0,
  image: "",
}));

const logs = [
  {
    price: 10.99, //limit to 2 decimal places
    amount: 20,
    totalCost: 109.9, //limit to 2 decimal places
  },
  {
    price: 11.99, //limit to 2 decimal places
    amount: 10,
    totalCost: 209.9, //limit to 2 decimal places
  },
  {
    price: 1.99, //limit to 2 decimal places
    amount: 10,
    totalCost: 19.9, //limit to 2 decimal places
  },
]
export const mockData = (): SeedDataResult => {
  const newFoods = Array(10)
    .fill(foods)
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
  };
};
