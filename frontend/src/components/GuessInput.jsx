// GuessInput.js
import AnimeNameAutocomplete from "components/AnimeNameAutocomplete";
import { Box, Button } from "@mui/material";

const GuessInput = ({ onNameSelect, tryGuess, animeNames }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      alignItems="center"
    >
      <AnimeNameAutocomplete
        animeNames={animeNames}
        onNameSelect={onNameSelect}
      />
      <Box>
        <Button
          variant="contained"
          sx={{ mx: "10px" }}
          size="large"
          onClick={() => tryGuess()}
        >
          Responder
        </Button>
      </Box>
    </Box>
  );
};

export default GuessInput;
