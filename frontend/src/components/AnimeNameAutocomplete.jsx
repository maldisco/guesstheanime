import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';


function AnimeNameAutocomplete({ animeNames, onNameSelect}) {
    const [inputValue, setInputValue] = useState('');
  
    return (
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
          <TextField {...params} name="anime-name" label="Search for an anime..." fullWidth sx={{ m: "1rem 0" }}/>
        )}
      />
    );
  }
  
  export default AnimeNameAutocomplete;
  