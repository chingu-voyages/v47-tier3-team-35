'use client'

import { useState } from 'react';

import { getIncrementFood } from '@/dashboard/spaces/[spaceId]/[foodId]/actions/actions';
import { FoodDataType } from '@/dashboard/spaces/[spaceId]/[foodId]/page';


const useFoodData = (initialData: FoodDataType) => {
  const [currentFoodData, setFoodData] = useState(initialData);

  const handleIncrement = async (num: number) => {
    // update optimistically
    const amount = currentFoodData.amount;
    const originalValue = amount;
    const newValue = amount + num;
    if (newValue >= 0) {
      setFoodData({ ...currentFoodData, amount: newValue });
      try {
        const updateResponse = await getIncrementFood(currentFoodData.id, newValue); // Assuming getIncrementFood is defined elsewhere
        console.log(updateResponse);
      } catch (err) {
        console.log(err);
        setFoodData({ ...currentFoodData, amount: originalValue });
      }
    }
  };

  return { currentFoodData, handleIncrement };
};

export default useFoodData;
