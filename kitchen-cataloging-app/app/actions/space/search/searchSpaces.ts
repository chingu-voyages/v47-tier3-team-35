import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { Room } from "@prisma/client";
import dbConnect from "@/mongoDB/connection";
import mongoose from "mongoose";
import {
  PaginationProps,
  SearchFuncProps,
} from "@/components/pagination/types";
import SpaceModel from "@/mongoDB/SpaceModelSchema";
type SpaceAsyncFuncDataProps = PaginationProps &
  Pick<SearchFuncProps, "text"> & { userId: string };
const ObjectId = mongoose.Types.ObjectId;
export const createSpaceItemSearchQuery = ({
  userId,
  text,
  take,
  cursor,
}: SpaceAsyncFuncDataProps) => {
  const query: any[] = [
    {
      $match: {
        $text: { $search: text },
        userId: new ObjectId(userId),
      },
    },
    //hard limit of 10000 relevant items at a time in search, to ensure query never performs poorly
    { $limit: 10000 },
    // this is where we add the cursor logic
    {
      $project: {
        _id: 1,
        title: 1,
        score: { $meta: "textScore" },
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
export const searchSpaces = async (
  props: PaginationProps &
    Pick<SearchFuncProps, "text"> & { userId?: string | null }
) => {
  const { userId, take, cursor, text } = props;
  const user = await getUserInfoServer({ userId });
  if (!user?.id) return null;
  const searchText = text ? text.trim() : "";
  //must have a string at least 3 characters long to search food items
  if (searchText.length < 3) return [];
  //connect to database
  await dbConnect();
  //create search query depending on params passed
  const query = createSpaceItemSearchQuery({
    userId: user.id,
    text: searchText,
    take,
    cursor,
  });
  const result = await SpaceModel.aggregate(query).exec();
  const serializedResult = result.map((e) => {
    const id = e._id.toString();
    if (e._id) delete e._id;
    return { ...e, id: id };
  }) as (Partial<Room> & { id: string; score?: number })[];
  return serializedResult;
};

export default searchSpaces;
