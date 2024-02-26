import { GroceryItemAsyncFuncDataProps } from "../types/types";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { GroceryItem } from "@prisma/client";
import dbConnect from "@/mongoDB/connection";
import GroceryItemModel from "@/mongoDB/GroceryItemSchema";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
export const createGroceryItemSearchQuery = ({
  userId,
  spaceId,
  text,
  take,
  cursor,
}: GroceryItemAsyncFuncDataProps & { userId: string }) => {
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
        index: "search_grocery_items_by_text",
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
    //hard limit of 10000 relevant items at a time in search, to ensure query never performs poorly
    { $limit: 10000 },
    // this is where we add the cursor logic
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
    //keep most relevant first, then sort id accordingly inside
    { $sort: { score: 1, _id: -1 } },
    { $limit: take },
  ];
  if (cursor) {
    //cursor will contain the object id, and the score
    const cursorArr = cursor.split("?score=");
    if (cursorArr.length >= 2) {
      const [cursorId, score] = cursorArr;
      const cursorQuery = {
        $match: {
          $or: [
            //less than current score, we haven't seen the documents
            { score: { $lt: parseFloat(score) } },
            //greater than current score, we have seen the documents, but not the current one
            { score: score, _id: { $gt: new ObjectId(cursorId) } },
          ],
        },
      };
      query.splice(3, 0, cursorQuery);
    }
  }
  return query;
};
export const searchGroceries = async (
  props: GroceryItemAsyncFuncDataProps & { userId?: string | null }
) => {
  const { userId, spaceId, take, cursor, text } = props;
  const user = await getUserInfoServer({ userId });
  if (!user?.id) return null;
  const searchText = text ? text.trim() : "";
  //must have a string at least 3 characters long to search food items
  if (searchText.length < 3) return [];
  //connect to database
  await dbConnect();
  //create search query depending on params passed
  const query = createGroceryItemSearchQuery({
    userId: user.id,
    spaceId: spaceId,
    text: searchText,
    take,
    cursor,
  });
  const result = await GroceryItemModel.aggregate(query).exec();
  const serializedResult = result.map((e) => {
    const id = e._id.toString();
    if (e._id) delete e._id;
    return { ...e, id: id, roomId: e.roomId?.toString() };
  }) as (Partial<GroceryItem> & { id: string; score?: number })[];
  return serializedResult;
};

export default searchGroceries;
