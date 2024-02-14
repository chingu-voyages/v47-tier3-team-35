import { Box } from "@mui/material";

import Image from "next/image";

interface FoodImg {
  title: string;
  imgUrl?: string;
}

const FoodImg = ({imgUrl, title}: FoodImg) => {

  return (
      <Image
        fill
        className={"object-cover object-center md:rounded-[28px]"}
        alt={title}
        src={
          imgUrl ? imgUrl : `https://source.unsplash.com/random/?${title}`
        }
        sizes={""}
      />
  );
}

export default FoodImg
