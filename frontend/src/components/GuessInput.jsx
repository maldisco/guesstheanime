// GuessInput.js
import AnimeNameAutocomplete from "components/AnimeNameAutocomplete";
import { Box, Button } from "@mui/material";

/**
 * A component that renders an input field for guessing anime names and a button to submit the guess.
 * @param {Object} props - The component props.
 * @param {function} props.onNameSelect - A function to handle the selection of an anime name.
 * @param {function} props.tryGuess - A function to handle the submission of a guess.
 * @param {Array} props.animeNames - An array of anime names to be used in the autocomplete input.
 * @returns {JSX.Element} - The GuessInput component.
 */
const GuessInput = ({ onNameSelect, tryGuess, animeNames, isProcessingGuess }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap="1vw" height="7vh">
      <AnimeNameAutocomplete
        animeNames={animeNames}
        onNameSelect={onNameSelect}
        width="25vw"
      />
      <Box>
        <Button
          variant="contained"
          sx={{ mx: "10px" }}
          size="large"
          onClick={() => tryGuess()}
          disabled={isProcessingGuess}
        >
          Próximo
        </Button>
      </Box>
    </Box>
  );
};

export default GuessInput;
