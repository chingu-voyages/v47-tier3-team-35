'use server'

export const handleForm = async (formData: FormData) => {
    const newSpace = formData.get("space");
    const newTitle = formData.get("title");
    const newImage = formData.get("image");
    const newDescription = formData.get("description");
    const newPrice = formData.get("price");
    const newThreshold = formData.get("threshold");
    const getLabels = formData.get("labels") as string;
    const newLabels = getLabels?.split(',');
    const newExpiration = formData.get("date");

    console.log(
        {
        newSpace,
        newTitle,
        newImage,
        newDescription,
        newPrice,
        newThreshold,
        newLabels,
        newExpiration
        }
    );
  };