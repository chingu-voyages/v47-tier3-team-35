import { getCloudfrontSignedUrls } from "../presignUrls/actions";
export type CloudfrontUrlProps = {
  url: string;
  objKey: string;
};
const getImages = async ({ s3ObjectKeys }: { s3ObjectKeys: string[] }) => {
  const signedUrls = await getCloudfrontSignedUrls({ s3ObjectKeys });
  if (!signedUrls) return [];
  return signedUrls;
  //   const getCloudfrontObjPromise = signedUrls.map((url) =>
  //     axios({
  //       method: "GET",
  //       url: url.url,
  //     })
  //   );
  //   const cloudfrontObjs = await Promise.all(getCloudfrontObjPromise);
  //   const readKeys: CloudfrontUrlProps[] = [];
  //   const failedKeys: string[] = [];
  //   if (
  //     cloudfrontObjs.every((r, idx) => {
  //       if (r.status === 200) readKeys.push(signedUrls.);
  //       else failedKeys.push(s3ObjectKey[idx]);
  //       return r.status === 200;
  //     })
  //   )
  //     return { read: cloudfrontObjs };
  //   else return { read: readKeys, failed: failedKeys };
};
export default getImages;
