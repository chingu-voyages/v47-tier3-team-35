type RoomType = {
  id: string;
  title: string;
  userId: string;
};

type FoodType = {
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

type LogType = {
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

export const seedData = {
    rooms: [
        {
            title: 'My Refrigerator',
            
        },
        {
            title: 'My Secret Snack Stash',
        }
    ],
    foods: [
        {
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            description: 'Beer',
            price: 10.99,
            amount: 10,
            category: 'Beverage',
            threshold: 0,
            expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30 days from now
            notes: 'It\'s beer',
            room: 'My Refrigerator',  
        },
        {
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            description: 'Donuts',
            price: 6.50,
            amount: 12,
            category: 'Pastry',
            threshold: 0,
            expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), //10 days from now
            notes: 'Original glazed',
            room: 'My Refrigerator',  
        },
        {
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            description: '5-Gallon bucket of Cheese Balls',
            price: 8.00,
            amount: 1,
            category: 'Snack',
            threshold: 0,
            expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 50), //50 days from now
            notes: 'Don\'t ask',
            room: 'My Secret Snack Stash',  
        }
    ]
}