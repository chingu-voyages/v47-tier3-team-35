import { getSignedUrl } from "@aws-sdk/cloudfront-signer"; // ESM
const cloudfrontDistributionDomain = process.env.CLOUDFRONT_DOMAIN;
const privateKey = process.env.AWS_CLIENT_SECRET_KEY;
const keyPairId = process.env.AWS_CLIENT_ID;
export const presignCloudfrontObjectUrl = ({
  userId,
  s3ObjectKey,
}: {
  userId: string;
  s3ObjectKey: string;
}) => {
  if (!cloudfrontDistributionDomain || !privateKey || !keyPairId) return null;
  const url = `${cloudfrontDistributionDomain}/${userId}/${s3ObjectKey}`;
  const dateLessThan = "2022-01-01"; // any Date constructor compatible
  const signedUrl = getSignedUrl({
    url,
    keyPairId,
    dateLessThan,
    privateKey,
  });
  return signedUrl;
};
