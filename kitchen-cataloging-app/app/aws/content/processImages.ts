import Jimp from "jimp";
type ImgProps = {
  mimeType?: string | null;
  fileBuffer?: Buffer | null;
};
const createPlaceholder = ({
  jimpImg,
  sideSize,
}: {
  jimpImg: Jimp;
  sideSize: number;
}) => {
  const img = jimpImg.clone();
  const scaledDownWidth =
    img.bitmap.width < sideSize ? img.bitmap.width : sideSize;
  const scaledDownImg = img.resize(scaledDownWidth, Jimp.AUTO);
  return scaledDownImg;
};
const resizeImgToSquareRatio = async ({ mimeType, fileBuffer }: ImgProps) => {
  if (!fileBuffer || !mimeType) return null;
  const img = await Jimp.read(fileBuffer);
  const width = img.bitmap.width;
  const height = img.bitmap.height;
  const smallerSideSize = width > height ? height : width;
  const ratio = smallerSideSize / width;
  const processedRatio = isNaN(ratio) ? 0 : ratio;
  const newWidth = width * processedRatio;
  const newHeight = height * processedRatio;
  const x = width / 2;
  const y = height / 2;
  const squareImg = img.crop(x, y, newWidth, newHeight);
  return squareImg;
};
export const resizeImgToSquare = async ({
  mimeType,
  fileBuffer,
  sideSize,
  placeholderSideSize,
}: ImgProps & { sideSize: number; placeholderSideSize: number }) => {
  const squareImg = await resizeImgToSquareRatio({ mimeType, fileBuffer });
  if (!squareImg) return null;
  const scaledImg = squareImg.scaleToFit(sideSize, sideSize);
  const placeholder = createPlaceholder({
    jimpImg: scaledImg,
    sideSize: placeholderSideSize,
  });
  return {
    scaledImg,
    placeholder,
  };
};
