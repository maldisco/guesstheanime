import { Typography, Box, useTheme } from "@mui/material";

const GuessCounter = ({ guessNumber, finished, correct, onSkip }) => {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center" width="100%" gap="1rem">
      {Array.from({ length: 6 }, (_, index) => (
        <Typography
          sx={{
            backgroundColor:
              finished && correct && index + 1 === guessNumber
                ? "green"
                : finished && !correct
                ? "red"
                : index + 1 <= guessNumber
                ? theme.palette.neutral.light
                : theme.palette.background.alt,
            borderRadius: "15%",
            p: "0.5rem",
          }}
          fontWeight="bold"
          key={index}
        >
          {index + 1}
        </Typography>
      ))}
      <Typography
        onClick={() => onSkip()}
        sx={{
          backgroundColor: theme.palette.neutral.light,
          borderRadius: "15%",
          p: "0.5rem",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        fontWeight="bold"
        disabled={finished}
      >
        Skip
      </Typography>
    </Box>
  );
};

export default GuessCounter;
