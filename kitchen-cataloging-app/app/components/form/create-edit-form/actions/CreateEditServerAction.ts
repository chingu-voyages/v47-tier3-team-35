'use server'

import { Image } from "@prisma/client";
import addSingleFoodItem from "@/actions/food/crud/addFoodItem";
import updateSingleFoodItem from "@/actions/food/crud/updateFoodItem";
import { FoodType } from "@/prisma/mock/mockData";

export const addEditItem = async (
    newSpace: string,
    newTitle: string,
    newImage: Image,
    newPrice: string,
    newDescription: string,
    newThreshold: number,
    newLabels: string[],
    newExpiration: string,
    userId: string,
    itemData?: FoodType,
) => {
    // const newSpace = formData.get("space") as string;
    // const newTitle = formData.get("title") as string;
    // const newImageUrl = formData.get("image") as string;
    // const newDescription = formData.get("description") as string;
    // const newPrice = parseInt(formData.get("price") as string);
    // const newThreshold = parseInt(formData.get("threshold") as string);
    // const getLabels = formData.get("labels") as string;
    // const newLabels = getLabels?.split(',');
    // const newExpiration = formData.get("date") as string;

    console.log('creating new doc')

    const newDoc = {
        createdAt: itemData?.createdAt ? itemData.createdAt : new Date(),
        title: newTitle,
        description: newDescription,
        labels: newLabels, 
        amount: itemData?.amount ? itemData.amount : 0,
        price: parseFloat(newPrice),
        threshold: newThreshold,
        expirationDate: new Date(newExpiration),
        // Need to add ability to upload image to aws when it is a file. -- use uploadImgs function in aws folder -- do this in drag&drop component
        image: newImage,
        roomTitle: newSpace,
    }

    if (itemData) {
        const itemId = itemData.id;
        const updatedFoodItem = await updateSingleFoodItem(userId, itemId, newDoc);
        console.log('updatedFoodItem');
        return updatedFoodItem;
    } else {
        const createdFoodItem = await addSingleFoodItem(userId, newDoc);
        console.log('createdFoodItem');
        return createdFoodItem;
    }
};
  
