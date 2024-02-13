'use server'

import addSingleFoodItem from "./crud/addFoodItem";
import updateSingleFoodItem from "./crud/updateFoodItem";
import { FoodType } from "@/prisma/mock/mockData";

export const addEditItem = async (formData: FormData, userId: string, itemData?: FoodType,) => {
    const newSpace = formData.get("space") as string;
    const newTitle = formData.get("title") as string;
    const newImageUrl = formData.get("image") as string;
    const newDescription = formData.get("description") as string;
    const newPrice = parseInt(formData.get("price") as string);
    const newThreshold = parseInt(formData.get("threshold") as string);
    const getLabels = formData.get("labels") as string;
    const newLabels = getLabels?.split(',');
    const newExpiration = formData.get("date") as string;

    const newDoc = {
        createdAt: itemData?.createdAt ? itemData.createdAt : new Date(),
        title: newTitle,
        description: newDescription,
        labels: newLabels, 
        amount: itemData?.amount ? itemData.amount : 0,
        price: newPrice,
        threshold: newThreshold,
        expirationDate: new Date(newExpiration),
        // Need to add ability to upload image to aws when it is a file. -- use uploadImgs function in aws folder -- do this in drag&drop component
        // image: {
            // s3ObjKey: formData.get("itemImgS3ObjectImgUrl")?.toString(),
            // s3ObjKey: null,
            // url: newImageUrl,
            // },
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
  
