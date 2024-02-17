import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import dbConnect from "@/mongoDB/connection";
import FoodModel from "@/mongoDB/FoodSchema";
import mongoose from "mongoose";
import { SearchFoodProps, SearchResultFood } from "../types/types";
const ObjectId = mongoose.Types.ObjectId;
export const createFoodItemSearchQuery = ({
  userId,
  spaceId,
  text,
  take,
  cursor,
}: SearchFoodProps & { userId: string }) => {
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
  const query: any[] = [
    {
      $search: {
        index: "search_foods_by_text",
        compound: {
          filter: filterOptions,
          should: [
            {
              autocomplete: {
                query: text,
                path: "title",
                fuzzy: {
                  prefixLength: 0,
                  maxEdits: 1,
                },
              },
            },
            {
              autocomplete: {
                query: text,
                path: "description",
                fuzzy: {
                  prefixLength: 0,
                  maxEdits: 1,
                },
              },
            },
            {
              text: {
                query: text,
                path: "title",
                score: { boost: { value: 4 } },
              },
            },
            {
              text: {
                path: "description",
                query: text,
                score: { boost: { value: 2 } },
              },
            },
          ],
        },
        scoreDetails: true,
      },
    },
    //where match for cursor pagination will be inserted
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
        expirationDate: 1,
        score: { $meta: "searchScore" },
      },
    },
    { $match: { score: { $gt: 0.5 } } },
  ];
  if (cursor) {
    const cursorQuery = { $match: { _id: { $gt: new ObjectId(cursor) } } };
    query.splice(1, 0, cursorQuery);
  }
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
  const searchText = text ? text.trim() : "";
  //must have a string at least 4 characters long to search food items
  if (searchText.length < 3) return [];
  //connect to database
  await dbConnect();
  //create search query depending on params passed
  const query = createFoodItemSearchQuery({
    userId: user.id,
    spaceId: spaceId,
    text: searchText,
    take,
  });
  const result = await FoodModel.aggregate(query).exec();
  const serializedResult = result.map((e) => {
    const id = e._id.toString();
    if (e._id) delete e._id;
    return { ...e, id: id, roomId: e.roomId?.toString() };
  }) as SearchResultFood[];
  return serializedResult;
};
