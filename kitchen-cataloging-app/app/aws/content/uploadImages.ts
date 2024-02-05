import { getS3BucketPutSignedUrl } from "../presignUrls/actions";
import { FileToBeUploadedProps } from "../presignUrls/utils/presignS3BucketPutCommand";
import axios from "axios";
export type FileMediaType = {
  objKey?: string;
  name?: string;
};
const uploadImages = async ({
  files,
}: {
  files: (File & FileToBeUploadedProps)[];
}) => {
  const signedUrls = await getS3BucketPutSignedUrl({
    files: files.map((file) => ({ name: file.name, type: file.type })),
  });
  if (!signedUrls) return [];
  //generate a map
  const filesMap: { [key: string]: File } = Object.assign(
    {},
    ...files.map((file) => ({ [file.name]: file }))
  );
  const uploadToS3Promises = signedUrls.map((data) => {
    const { name, signedUrl } = data;
    const file = filesMap[name];
    const uploadPromise = axios({
      method: "PUT",
      url: signedUrl,
      data: file,
      headers: {
        "Content-Type": filesMap[name].type,
      },
    });
    return uploadPromise;
  });
  try {
    const response = await Promise.all(uploadToS3Promises);
    const uploadedKeys: FileMediaType[] = [];
    const failedKeys: FileMediaType[] = [];
    if (
      response.every((r, idx) => {
        if (r.status === 200)
          uploadedKeys.push({
            objKey: signedUrls[idx].s3ObjKey,
          });
        else
          failedKeys.push({
            name: signedUrls[idx].name,
          });
        return r.status === 200;
      })
    )
      return { uploaded: uploadedKeys };
    else return { uploaded: uploadedKeys, failed: failedKeys };
  } catch (e) {
    const error = new Error();
    error.stack = JSON.stringify(e);
    error.message = "Could not upload all media files to S3";
    throw error;
  }
};
export default uploadImages;
