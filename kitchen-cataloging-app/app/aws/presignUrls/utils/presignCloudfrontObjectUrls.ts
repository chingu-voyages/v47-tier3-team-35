import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { add } from "date-fns/add";
const cloudfrontDistributionDomain = process.env.CLOUDFRONT_DOMAIN_URL;
const privateKey = process.env.AWS_CLOUDFRONT_KEY_SECRET;
const keyPairId = process.env.AWS_CLOUDFRONT_KEY_ID;
export const presignCloudfrontObjectUrls = async ({
  userId,
  s3ObjectKeys,
}: {
  userId: string;
  s3ObjectKeys: string[];
}) => {
  if (!cloudfrontDistributionDomain || !privateKey || !keyPairId) return null;
  const user = await getUserInfoServer({ userId });
  if (!user) return null;
  const signedUrls = s3ObjectKeys.map((objKey) => {
    //this is secure by default because the user can only access content they themselves have uploaded
    const url = `${cloudfrontDistributionDomain}/${user.id}/${encodeURI(
      objKey
    )}`;
    const expires = add(new Date(), {
      minutes: 5,
    }).toString(); // any Date constructor compatible
    const signedUrl = getSignedUrl({
      url,
      keyPairId,
      dateLessThan: expires,
      privateKey,
    });
    return {
      url: signedUrl,
      objkey: objKey,
    };
  });
  return signedUrls;
};
