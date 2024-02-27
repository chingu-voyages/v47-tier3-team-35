'use client'

import { useState } from 'react';

import { getIncrementFood } from '@/actions/food/actions';
import { createFoodLogAction } from '@/actions/logs/actions';
import { FoodDataType } from '@/dashboard/spaces/[spaceId]/[foodId]/page';


import { LogType } from '@/prisma/mock/mockData';
export type LogDataType = Omit<LogType, "id" | "userId" | "foodId">;

// Optimistically update food data
const useIncrementFoodData = (initialData: FoodDataType) => {
  const [currentFoodData, setFoodData] = useState(initialData);
  const [currentLogs, setCurrentLogs] = useState(initialData.logs)

  const handleIncrement = async (num: number) => {
    // update optimistically
    const amount = currentFoodData.amount;
    const originalValue = amount;
    const originalLogs = initialData.logs;
    const newValue = amount + num;
    const price = currentFoodData.price;
    const newLog = {
      price: price,
      amount: num,
      // Date May be slightly off (by milliseconds) from timestamp data in database, 
      // but this is for UI purposes only and will give the correct day/month/year date, and will use the database data upon page rerender
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
        // Reset data if there is an error and set erver error
        setFoodData({ ...currentFoodData, amount: originalValue });
        setCurrentLogs(originalLogs)
        // setServerError()
      }
    }
  };

  return { currentFoodData, currentLogs, handleIncrement };
};

export default useIncrementFoodData;
