import { Box } from "@mui/material";

interface FoodImg {
  description: string;
  imgUrl?: string;
}

const FoodImg = ({imgUrl, description}: FoodImg) => {



  return (
    <Box
      className="object-cover object-center max-w-[34rem] h-full -ms-[1rem] md:rounded-[1rem] md:w-full md: mx-auto md:ms-0"
      component="img"
      sx={{
        width: { xs: 'calc(100% + 2rem)', md: '100%' },
        // ms: {xs: '-1rem', md: '0'}
      }}
      alt={description}
      src={
        imgUrl ? imgUrl : `https://source.unsplash.com/random/?${description}`
      }
    />
  );
}

export default FoodImg
