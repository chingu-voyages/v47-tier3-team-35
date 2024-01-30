import { Box } from "@mui/material";

interface FoodImg {
  description: string;
  imgUrl?: string;
}

const FoodImg = ({imgUrl, description}: FoodImg) => {



  return (
    <Box
      className='w-full aspect-[4/3] object-cover object-center max-w-[30rem] max-h-full mx-auto rounded-[1rem]'
      component="img"
      sx={{
        
      }}
      alt="The house from the offer."
      src={imgUrl ? imgUrl : `https://source.unsplash.com/random/?${description}`}
    />
  );
}

export default FoodImg
