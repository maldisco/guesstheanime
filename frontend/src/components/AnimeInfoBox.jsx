import { Box, Typography } from "@mui/material";

const AnimeInfoBox = ({ title, information, innerHtml = false }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      flexDirection="column"
    >
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      {!innerHtml && <Typography variant="h5">{information}</Typography>}
      {innerHtml && (
        <Typography
          variant="h5"
          dangerouslySetInnerHTML={{
            __html: information,
          }}
        />
      )}
    </Box>
  );
};

export default AnimeInfoBox;
