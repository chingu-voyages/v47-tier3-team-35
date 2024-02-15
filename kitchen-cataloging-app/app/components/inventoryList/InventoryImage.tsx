import { removeExtension } from "@/utils/removeExtension";
import { Food, GroceryItem } from "@prisma/client";
import Image from "next/image";
import InventoryImageWrapper from "./wrappers/InventoryImageWrapper";
export const InventoryImage = ({
  itemName,
  image,
  borderRadius,
}: {
  image?: Food["image"] | GroceryItem["image"];
  itemName: string;
  borderRadius?: string;
}) => {
  const src = image?.url ? image?.url : "";
  const [fileName, extension] = removeExtension(src);
  const placeholderSrc = fileName ? `${fileName}-placeholder.${extension}` : "";
  return (
    <InventoryImageWrapper>
      <Image
        alt={`Image showing ${itemName}`}
        className={`object-cover object-center ${borderRadius || ""}`}
        placeholder={"blur"}
        blurDataURL={
          placeholderSrc ||
          `https://source.unsplash.com/random/75x75?${itemName}`
        }
        sizes="100%"
        src={src || `https://source.unsplash.com/random/300x300?${itemName}`}
        loading="lazy"
        fill={true}
      />
    </InventoryImageWrapper>
  );
};
