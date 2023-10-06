import { Box, Typography } from "@mui/material";
import {
  setCurrent,
  setAlreadyGuessed,
  addCorrectGuess,
  setGuessNumber,
  setPreviousGuesses,
  setFinished,
  setCorrect,
} from "state";
import WidgetWrapper from "components/WidgetWrapper";
import AnimeImage from "components/AnimeImage";
import GuessCounter from "components/GuessCounter";
import ResultFeedback from "components/ResultFeedback";
import AnimeInformation from "components/AnimeInformation";
import PreviousGuesses from "components/PreviousGuesses";
import GuessInput from "components/GuessInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

/**
 * A component that renders an anime guessing game.
 * @param {Object} props - The component props.
 * @param {number} props.guessNumber - The current guess number.
 * @param {Array} props.previousGuesses - The list of previous guesses.
 * @param {Object} props.current - The current anime being guessed.
 * @param {Array} props.alreadyGuessed - The list of already guessed animes.
 * @param {boolean} props.finished - A flag indicating if the game has finished.
 * @param {boolean} props.correct - A flag indicating if the current guess is correct.
 * @returns {JSX.Element} - The JSX element representing the AnimeQuiz component.
 */
const AnimeQuiz = ({
  guessNumber,
  previousGuesses,
  current,
  alreadyGuessed,
  finished,
  correct,
}) => {
  const dispatch = useDispatch();

  // State variables
  const [animeNames, setAnimeNames] = useState([]);
  const [guess, setGuess] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getAnime = async () => {
    // if there is no anime in cache
    if (!current) {
      // id of all animes already guessed
      const excludedIds = alreadyGuessed.map(
        (guessedAnime) => guessedAnime.anime._id
      );

      // Get a new anime
      axios
        .post(
          "http://localhost:3001/api/animes/aleatorio",
          JSON.stringify({ excludedIds: excludedIds }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          dispatch(setCurrent(response.data));
        });
    }

    // Get all anime names for the autocomplete
    axios.get("http://localhost:3001/api/animes/nomes").then((response) => {
      setAnimeNames(response.data);
    });

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
      // Add the current anime and if user got it to the list of already guessed animes
      const guessedAnime = {
        anime: current,
        isCorrect: correct,
      };
      dispatch(setAlreadyGuessed([...alreadyGuessed, guessedAnime]));

      const excludedIds = alreadyGuessed.map(
        (guessedAnime) => guessedAnime.anime._id
      );

      // Get a new anime
      axios
        .post(
          "http://localhost:3001/api/animes/aleatorio",
          JSON.stringify({ excludedIds: excludedIds }),
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
    <>
      {!isLoading && (
        <WidgetWrapper display="flex" flexDirection="column" gap="1rem" height="100%">
          {/* Anime cover image (or its placeholder) */}
          <AnimeImage image={current.capa} finished={finished} />

          <Box display="flex" justifyContent="center" width="100%">
            <Typography variant="h5">Release: {current.ano}</Typography>
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
      )}
    </>
  );
};

export default AnimeQuiz;
