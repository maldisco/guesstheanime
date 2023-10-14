import { useState } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";

/**
 * Renders an autocomplete component for anime names.
 * @param {Object} props - The component props.
 * @param {Array} props.animeNames - The list of anime names to display in the autocomplete.
 * @param {Function} props.onNameSelect - The function to call when a name is selected from the autocomplete.
 * @param {string} props.width - The width of the component.
 * @returns {JSX.Element} - The JSX element for the AnimeNameAutocomplete component.
 */
function AnimeNameAutocomplete({ animeNames, onNameSelect, width }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <Box width={width}>
      <Autocomplete
        id="anime-name-autocomplete"
        fullWidth
        options={animeNames}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(event, newValue) => {
          onNameSelect(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            name="anime-name"
            label="Search for an anime..."
            variant="outlined"
            fullWidth
          />
        )}
      />
    </Box>
  );
}

export default AnimeNameAutocomplete;
