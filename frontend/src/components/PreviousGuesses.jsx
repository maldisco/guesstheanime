import { Typography, Box, useTheme } from "@mui/material";

const PreviousGuesses = ({ previousGuesses }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="100%"
      alignItems="center"
    >
      {previousGuesses.map((guess) => (
        <Typography
          sx={{
            backgroundColor: theme.palette.neutral.light,
            p: "0.5rem",
            m: "0.1rem",
            width: "50%",
          }}
          fontWeight="bold"
          textAlign="center"
          key={guess}
        >
          {guess}
        </Typography>
      ))}
    </Box>
  );
};

export default PreviousGuesses;
