import { Box } from "@mui/material";

import Image from "next/image";

interface FoodImg {
  description: string;
  imgUrl?: string;
}

const FoodImg = ({imgUrl, description}: FoodImg) => {

  return (
      <Image
        fill
        className={"object-cover object-center md:rounded-[28px]"}
        alt={description}
        src={
          imgUrl ? imgUrl : `https://source.unsplash.com/random/?${description}`
        }
        sizes={""}
      />
  );
}

export default FoodImg
