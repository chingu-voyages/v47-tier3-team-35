import { PrismaClient } from "@prisma/client";
import { mockData } from "./mockData";
import * as dotenv from "dotenv";
const seedData = async () => {
  dotenv.config({
    path: `.env.local`,
  });
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  const data = mockData();
  const promiseArr = users.map(async (user) => {
    const userId = user.id;
    // delete all records tied to a user
    const deleteOperation = prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        foods: {
          deleteMany: {},
        },
        logs: {
          deleteMany: {},
        },
        rooms: {
          deleteMany: {},
        },
        foodItemVersions: {
          deleteMany: {},
        },
      },
      include: {
        foodItemVersions: true,
        foods: true,
        logs: true,
        rooms: true,
      },
    });
    //delete every record first
    const deletedItems = await deleteOperation;
    //create all items
    const createOperations = data.rooms.map(async (room) => {
      //create rooms and foods first
      const roomResult = await prisma.room.create({
        data: {
          ...room,
          userId: userId,
          foods: {
            createMany: {
              data: data.foods.map((food) => ({
                ...food,
                userId: userId,
                roomTitle: room.title,
              })),
            },
          },
        },
        include: {
          foods: true,
        },
      });
      //create all food item ver
      const allFoodItemVersPromiseArr = roomResult.foods.map((food) => {
        const foodItemVersCreated = prisma.foodItemVersion.createMany({
          data: data.foodVers.map((foodItemVer) => ({
            ...foodItemVer,
            foodId: food.id,
            userId: userId,
          })),
        });
        return foodItemVersCreated;
      });
      //create logs from foods returned in previous operation
      const allLogsPromiseArr = roomResult.foods.map((food) => {
        const logsCreated = prisma.log.createMany({
          data: data.logs.map((log) => ({
            ...log,
            foodId: food.id,
            userId: userId,
          })),
        });
        return logsCreated;
      });
      const allLogsPromise = Promise.all(allLogsPromiseArr);
      const allFoodItemVersPromise = Promise.all(allFoodItemVersPromiseArr);
      const [allLogsResult, allFoodVersResult] = await Promise.all([
        allLogsPromise,
        allFoodItemVersPromise,
      ]);
      return {
        foodsCreated: roomResult.foods.length,
        logsCreated: allLogsResult.reduce((acc, curr) => acc + curr.count, 0),
        foodVerCreated: allFoodVersResult.reduce(
          (acc, curr) => acc + curr.count,
          0
        ),
      };
    });
    const createItems = await Promise.all(createOperations);
    return {
      roomsCreated: createItems.length,
      foodsCreated: createItems.reduce(
        (acc, curr) => acc + curr.foodsCreated,
        0
      ),
      logsCreated: createItems.reduce((acc, curr) => acc + curr.logsCreated, 0),
      totalRecordDeleted:
        deletedItems.logs.length +
        deletedItems.foods.length +
        deletedItems.foodItemVersions.length +
        deletedItems.rooms.length,
    };
  });
  const results = await Promise.all(promiseArr);
  const totalCount = results.reduce(
    (acc, curr) => ({
      roomsCreated: acc.roomsCreated + curr.roomsCreated,
      foodsCreated: acc.foodsCreated + curr.foodsCreated,
      logsCreated: acc.logsCreated + curr.logsCreated,
      totalRecordDeleted: acc.totalRecordDeleted + curr.totalRecordDeleted,
    }),
    {
      roomsCreated: 0,
      foodsCreated: 0,
      logsCreated: 0,
      totalRecordDeleted: 0,
    }
  );
  console.log(
    `Rooms Created: ${totalCount.roomsCreated}\n Seeded food Items: ${totalCount.foodsCreated} \n Seeded Logs: ${totalCount.logsCreated} \n Total Records Delete ${totalCount.totalRecordDeleted}`
  );
};
if (require.main === module) seedData();
