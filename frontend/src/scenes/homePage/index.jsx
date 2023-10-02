import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "scenes/navbar";
import WidgetWrapper from "components/WidgetWrapper";
import AnimeImage from "components/AnimeImage";
import GuessCounter from "components/GuessCounter";
import ResultFeedback from "components/ResultFeedback";
import PreviousGuesses from "components/PreviousGuesses";
import AnimeInformation from "components/AnimeInformation";
import GuessInput from "components/GuessInput";
import { useEffect, useState } from "react";
import {
  setCurrent,
  setAlreadyGuessed,
  addCorrectGuess,
  setGuessNumber,
  setPreviousGuesses,
  setFinished,
  setCorrect,
} from "state";
import axios from "axios";

const HomePage = () => {
  // Redux variables (cache)
  const {
    guessNumber,
    previousGuesses,
    current,
    alreadyGuessed,
    finished,
    correct,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  // State variables
  const [animeNames, setAnimeNames] = useState([]);
  const [guess, setGuess] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getAnime = async () => {
    // if there is no anime in cache
    if (!current) {
      // Get a new anime
      axios
        .post(
          "http://localhost:3001/api/animes/aleatorio",
          JSON.stringify({ excludedIds: alreadyGuessed }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          dispatch(setCurrent(response.data));
        });
    }

    // Get all anime names for the autocomplete
    const response2 = await fetch("http://localhost:3001/api/animes/nomes");
    const data2 = await response2.json();
    setAnimeNames(data2);

    setIsLoading(false);
  };

  const selectName = async (name) => {
    setGuess(name);
  };

  const tryGuess = async () => {
    if (guess === current.nome || guess === current.nome2) {
      // Save the correct guess number to cache
      dispatch(addCorrectGuess(guessNumber));
      // set correct flag
      dispatch(setCorrect(true));
      // set finish flag
      dispatch(setFinished(true));
      // Save current list of previous guesses to cache
      dispatch(setPreviousGuesses([...previousGuesses, guess]));
    } else {
      // Add 1 to the current guess number and save it in cache
      dispatch(setGuessNumber(guessNumber + 1));
      // Add the current guess to the list of previous guesses and save it in cache
      dispatch(setPreviousGuesses([...previousGuesses, guess]));
      // set finish flag
      dispatch(setFinished(guessNumber === 6));
    }
  };

  const reset = async () => {
    setIsLoading(true);
    // while loading
    {
      // Add the current anime id to the list of already guessed animes
      dispatch(setAlreadyGuessed([...alreadyGuessed, current._id]));

      // Get a new anime
      axios
        .post(
          "http://localhost:3001/api/animes/aleatorio",
          JSON.stringify({ excludedIds: alreadyGuessed }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => dispatch(setCurrent(response.data)));

      setGuess("");
      dispatch(setCorrect(false));
      dispatch(setFinished(false));
      dispatch(setGuessNumber(1));
      dispatch(setPreviousGuesses([]));
    }
    setIsLoading(false);
  };

  const skipGuess = async () => {
    if (guessNumber <= 6) {
      // Add 1 to the current guess number and save it in cache
      dispatch(setGuessNumber(guessNumber + 1));
      // set finish flag
      dispatch(setFinished(guessNumber === 6));
    }
  };

  useEffect(() => {
    getAnime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="0.5rem"
        justifyContent="center"
      >
        {!isLoading && (
          <Box flexBasis="50%">
            <WidgetWrapper display="flex" flexDirection="column" gap="1rem">
              {/* Anime cover image (or its placeholder) */}
              <AnimeImage image={current.capa} finished={finished} />

              <Box display="flex" justifyContent="center" width="100%">
                <Typography variant="h5">Lançamento: {current.ano}</Typography>
              </Box>

              {/* Number of guesses and skip button */}
              <GuessCounter
                finished={finished}
                correct={correct}
                guessNumber={guessNumber}
                onSkip={skipGuess}
              />

              {/* Result feedback and next button */}
              {finished && (
                <ResultFeedback
                  finished={finished}
                  correct={correct}
                  animeName={current.nome}
                  onClickNext={reset}
                />
              )}

              {/* Answer box and button */}
              {!finished && (
                <GuessInput
                  onNameSelect={selectName}
                  tryGuess={tryGuess}
                  animeNames={animeNames}
                />
              )}

              {/* Anime information */}
              {!finished && (
                <AnimeInformation
                  finished={finished}
                  guessNumber={guessNumber}
                  current={current}
                />
              )}

              {/* List of previous guesses */}
              <PreviousGuesses previousGuesses={previousGuesses} />
            </WidgetWrapper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
