import { getCloudfrontSignedUrls } from "../actions";
export const replaceImgKeyWithSignedUrls = async <T>({
  items,
}: {
  items: (T & { image?: string | null })[];
}) => {
  const imgKeys = items
    .map((items) => items.image)
    .filter((img) => img) as string[];
  const signedUrls = await getCloudfrontSignedUrls({
    s3ObjectKeys: imgKeys,
  });
  //return array if rooms exist, else return null
  if (items.length > 0 && signedUrls)
    //we return our items, but with our signed cloudfront urls
    return items.map((item, idx) => ({
      ...item,
      image: signedUrls[idx].url,
    }));
  else return null;
};