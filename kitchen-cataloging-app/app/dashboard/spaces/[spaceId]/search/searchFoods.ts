import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { Food } from "@prisma/client";
import dbConnect from "@/mongoDB/connection";
import FoodModel from "@/mongoDB/FoodSchema";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
export type SearchFoodProps = {
  cursor?: string | null;
  text: string;
  take: number;
  spaceId?: string | null;
};
export const createFoodItemSearchQuery = ({
  userId,
  spaceId,
  searchText,
  take,
}: {
  userId: string;
  spaceId?: string | null;
  searchText: string;
  take: number;
}) => {
  const filterOptions = [
    {
      equals: {
        path: "userId",
        value: new ObjectId(userId),
      },
    },
  ];
  if (spaceId) {
    filterOptions.push({
      equals: {
        path: "roomId",
        value: new ObjectId(spaceId),
      },
    });
  }
  const query = [
    {
      $search: {
        index: "search_foods_by_text",
        compound: {
          filter: filterOptions,
          should: [
            {
              autocomplete: {
                query: searchText,
                path: "title",
                fuzzy: {
                  prefixLength: 0,
                  maxEdits: 1,
                },
              },
            },
            {
              autocomplete: {
                query: searchText,
                path: "description",
                fuzzy: {
                  prefixLength: 0,
                  maxEdits: 1,
                },
              },
            },
            {
              text: {
                query: searchText,
                path: "title",
                score: { boost: { value: 4 } },
              },
            },
            {
              text: {
                path: "description",
                query: searchText,
                score: { boost: { value: 2 } },
              },
            },
          ],
        },
        scoreDetails: true,
      },
    },
    { $limit: take },
    {
      $project: {
        _id: 1,
        title: 1,
        roomTitle: 1,
        labels: 1,
        roomId: 1,
        amount: 1,
        image: 1,
        score: { $meta: "searchScore" },
      },
    },
    { $match: { score: { $gt: 0.5 } } },
  ];

  return query;
};
export const searchFoods = async ({
  text,
  take,
  spaceId,
  userId,
}: SearchFoodProps & {
  userId?: string | null;
}) => {
  const user = await getUserInfoServer({ userId });
  if (!user?.id) return null;
  const searchText = text.trim();
  //must have a string at least 4 characters long to search food items
  if (searchText.length < 4) return [];
  //connect to database
  await dbConnect();
  //create search query depending on params passed
  const query = createFoodItemSearchQuery({
    userId: user.id,
    spaceId: spaceId,
    searchText,
    take,
  });
  const result = await FoodModel.aggregate(query).exec();
  const serializedResult = result.map((e) => {
    const id = e._id.toString();
    if (e._id) delete e._id;
    return { ...e, id: id, roomId: e.roomId?.toString() };
  }) as (Partial<Food> & { id: string })[];
  return serializedResult;
};
