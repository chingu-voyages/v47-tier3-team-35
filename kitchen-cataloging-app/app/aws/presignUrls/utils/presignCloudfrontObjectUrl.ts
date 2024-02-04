import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer"; // ESM
const cloudfrontDistributionDomain = process.env.CLOUDFRONT_DOMAIN;
const privateKey = process.env.AWS_CLIENT_SECRET_KEY;
const keyPairId = process.env.AWS_CLIENT_ID;
export const presignCloudfrontObjectUrl = async ({
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
    const url = `${cloudfrontDistributionDomain}/${user.id}/${objKey}`;
    const dateLessThan = "2022-01-01"; // any Date constructor compatible
    const signedUrl = getSignedUrl({
      url,
      keyPairId,
      dateLessThan,
      privateKey,
    });
    return {
      url: signedUrl,
      objkey: objKey,
    };
  });
  return signedUrls;
};
