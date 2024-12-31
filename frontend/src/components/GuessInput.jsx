// GuessInput.js
import AnimeNameAutocomplete from "components/AnimeNameAutocomplete";
import { Box, Button } from "@mui/material";


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
          Guess
        </Button>
      </Box>
    </Box>
  );
};

export default GuessInput;
