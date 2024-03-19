import { SuccessResult } from "@/utils/types/types";
import { Room } from "@prisma/client";

export type SpaceSuccessResult = SuccessResult & {
  result: Room;
};
