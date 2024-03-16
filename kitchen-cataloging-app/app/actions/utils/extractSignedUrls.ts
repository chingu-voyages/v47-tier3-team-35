import { Image } from "@prisma/client";
import { replaceImgKeyWithSignedUrls } from "@/aws/presignUrls/utils/replaceImgKeyWithSignedUrl";
const extractSignedUrls = async <T,>(
  nextItems?: (T & { image?: Image | null })[]
) => {
  if (!nextItems) return nextItems;
  const nextItemsWithUrls = await replaceImgKeyWithSignedUrls({
    items: nextItems,
  });
  //we do this in case presigning url fails. This way we can still read content data,
  //though we can't load the url
  return (
    nextItemsWithUrls ||
    nextItems.map((item) => ({
      ...item,
      image: {
        s3ObjKey: null,
        url: "",
      },
    }))
  );
};

export default extractSignedUrls;
