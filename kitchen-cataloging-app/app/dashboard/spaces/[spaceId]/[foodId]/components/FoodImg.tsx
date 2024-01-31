import { Box } from "@mui/material";

interface FoodImg {
  description: string;
  imgUrl?: string;
}

const FoodImg = ({imgUrl, description}: FoodImg) => {



  return (
    <Box
      className='w-full object-cover object-center max-w-[34rem] max-h-full mx-auto rounded-[1rem]'
      component="img"
      sx={{
        
      }}
      alt="The house from the offer."
      src={imgUrl ? imgUrl : `https://source.unsplash.com/random/?${description}`}
    />
  );
}

export default FoodImg
