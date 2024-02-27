'use client'

import { useState } from 'react';

import { getIncrementFood, createFoodLogAction } from '@/actions/food/actions';
import { FoodDataType } from '@/dashboard/spaces/[spaceId]/[foodId]/page';

import { LogType } from '@/prisma/mock/mockData';
export type LogDataType = Omit<LogType, "id" | "userId" | "foodId">;

const useIncrementFoodData = (initialData: FoodDataType) => {
  const [currentFoodData, setFoodData] = useState(initialData);
  const [currentLogs, setCurrentLogs] = useState(initialData.logs)

  const handleIncrement = async (num: number) => {
    // update optimistically
    const amount = currentFoodData.amount;
    const originalValue = amount;
    const newValue = amount + num;
    const price = currentFoodData.price;
    const newLog = {
      price: price,
      amount: num,
      // May be slightly off from data in database, but for UI purposes only and will give the same day
      timestamp: new Date()
    }

    if (newValue >= 0) {
      setFoodData({ ...currentFoodData, amount: newValue });
      setCurrentLogs([...currentLogs, newLog])
      try {
        const updateResponse = await getIncrementFood(currentFoodData.id, newValue);
        const newFoodLog = await createFoodLogAction(currentFoodData.id, num, price)
        // console.log(updateResponse)
        // console.log(newFoodLog)
      } catch (err) {
        console.log(err);
        setFoodData({ ...currentFoodData, amount: originalValue });
      }
    }
  };

  return { currentFoodData, currentLogs, handleIncrement };
};

export default useIncrementFoodData;
