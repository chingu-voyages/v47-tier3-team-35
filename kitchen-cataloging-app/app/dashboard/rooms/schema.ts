import { z } from "zod"

export const RoomSchema = z.string().min(3).max(30).trim();