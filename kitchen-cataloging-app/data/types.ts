export type RoomType = {
  id: string;
  title: string;
  userId: string;
};

export type FoodType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  price: number;
  amount: number;
  category: string;
  threshold?: number | null;
  expirationDate?: Date | null;
  image?: string | null;
  notes?: string | null;
  log: LogType[];
  userId: string;
  room: string;
};

export type LogType = {
  id: string;
  price: number;
  amount: number;
  totalCost: number;
  timestamp: Date;
  foodId: string;
};

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  clerkId: string;
  createdAt: Date;
  updatedAt: Date;
  foods: FoodType[];
  rooms: RoomType[];
};

export type PrismaUserResult = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  clerkId: string;
  createdAt: Date;
  updatedAt: Date;
  foods: {
    log: LogType[];
  }[];
  rooms: RoomType[];
};

export type ErrorType = {
    error: {
        status: string,
        message: string,
    }
}
