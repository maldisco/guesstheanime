import { Typography, Box, useTheme } from "@mui/material";

/**
 * Renders a component that displays the number of guesses made by the user.
 * @param {Object} props - The component props.
 * @param {number} props.guessNumber - The number of guesses made by the user.
 * @param {boolean} props.finished - Indicates whether the game has finished.
 * @param {boolean} props.correct - Indicates whether the user's last guess was correct.
 * @param {Function} props.onSkip - The function to call when the user clicks the "Skip" button.
 * @returns {JSX.Element} - The GuessCounter component.
 */
const GuessCounter = ({ guessNumber, finished, correct, onSkip }) => {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center" width="100%" gap="1vw">
      {Array.from({ length: 5 }, (_, index) => (
        <Typography
          variant="pageNumber"
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
        variant="pageNumber"
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
