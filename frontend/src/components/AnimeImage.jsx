import { Box, useTheme } from "@mui/material";

const AnimeImage = ({ image, size = "35", finished }) => {
  const imageSizeStyle = {
    objectFit: "cover",
    width: `${size}%`,
    height: "auto",
  };

  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center" width="100%">
      {finished ? (
        <img
          style={imageSizeStyle}
          alt="anime"
          src={`http://localhost:3001/assets/${image}`}
        />
      ) : (
        <Box
          width="253px"
          height="358px"
          backgroundColor={theme.palette.background.default}
          borderRadius="1rem"
        />
      )}
    </Box>
  );
};

export default AnimeImage;
