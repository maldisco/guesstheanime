import { Box, useTheme } from "@mui/material";
import { render } from "@testing-library/react";

const AnimeImage = ({ image, height }) => {
  const imageSizeStyle = {
    objectFit: "cover",
    height: `${height}vh`,
    width: `auto`,
    filter: "grayscale(100%)",
  };

  return <img style={imageSizeStyle} alt="anime" src={image}/>;
};

export default AnimeImage;
