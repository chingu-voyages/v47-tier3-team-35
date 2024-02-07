import { Image } from "@prisma/client";
import { getCloudfrontSignedUrls } from "../actions";
export const replaceImgKeyWithSignedUrls = async <T>({
  items,
}: {
  items: (T & { image?: Image | null })[];
}) => {
  const imgKeys = items
    .map((items) => items.image?.s3ObjKey)
    .filter((img) => img) as string[];
  const signedUrls = await getCloudfrontSignedUrls({
    s3ObjectKeys: imgKeys,
  });
  //return array if images exist, else return null
  if (!(items.length > 0) || !signedUrls) return null;
  //we return our items, but with our signed cloudfront urls
  return items.map((item, idx) => ({
    ...item,
    image: {
      ...item.image,
      url: signedUrls[idx].url,
    },
  }));
};
