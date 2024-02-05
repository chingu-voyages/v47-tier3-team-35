import { Box } from "@mui/material";
import { Food } from "@prisma/client";
import Image from "next/image";
export const InventoryImage = ({
  itemName,
  image,
  borderRadius,
}: {
  image?: Food["image"];
  itemName: Food["title"];
  borderRadius?: string;
}) => {
  return (
    <Box className="flex w-full max-h-48 aspect-[16/10] xs:aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/10]">
      <Box className={`relative w-full h-full ${borderRadius}`}>
        <Image
          alt={`Image showing ${itemName}`}
          className={`object-cover object-center ${borderRadius || ""}`}
          placeholder={"blur"}
          blurDataURL={`${image}-placeholder`}
          src={
            image
              ? image
              : `https://source.unsplash.com/random/200x200?${itemName}`
          }
          loading="lazy"
          fill={true}
        />
      </Box>
    </Box>
  );
};
