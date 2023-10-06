import { Typography, Box } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * Renders a list of past guesses, showing the anime name and whether the guess was correct or not.
 * @param {Object} props - The component props.
 * @param {Array} props.alreadyGuessed - An array of objects containing the anime and a boolean indicating whether the guess was correct or not.
 * @returns {JSX.Element} - The PastGuesses component.
 */
const PastGuesses = ({ alreadyGuessed }) => {
  return (
    <WidgetWrapper height="70vh">
      <Box display="flex" flexDirection="column" overflow="auto">
        {alreadyGuessed
          .slice()
          .reverse()
          .map(({ anime, isCorrect }) => (
            <Box display="flex" justifyContent="space-between" key={anime._id}>
              <Typography
                sx={{
                  maxWidth: "80%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {anime.nome}
              </Typography>
              {isCorrect ? (
                <CheckIcon sx={{ color: "green" }} />
              ) : (
                <ClearIcon sx={{ color: "red" }} />
              )}
            </Box>
          ))}
      </Box>
    </WidgetWrapper>
  );
};

export default PastGuesses;
