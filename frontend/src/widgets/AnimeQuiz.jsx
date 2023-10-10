import { Box, Typography } from "@mui/material";
import {
  setCurrent,
  setAlreadyGuessed,
  addCorrectGuess,
  setGuessNumber,
  setPreviousGuesses,
  setFinished,
  setCorrect,
  resetGuesses,
  setCurrentReview,
} from "state";
import WidgetWrapper from "components/WidgetWrapper";
import AnimeImage from "components/AnimeImage";
import GuessCounter from "components/GuessCounter";
import ResultFeedback from "components/ResultFeedback";
import AnimeInformation from "components/AnimeInformation";
import PreviousGuesses from "components/PreviousGuesses";
import GuessInput from "components/GuessInput";
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
  animeList,
  currentReview
}) => {
  const dispatch = useDispatch();

  // State variables
  const [animeNames, setAnimeNames] = useState([]);
  const [guess, setGuess] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const normalizeAndClean = (str) => {
    if (!str) return null;
    const normalized = str
      .replace(/[^a-zA-Z ]/g, "")
      .trim()
      .toLowerCase();
    // Replace "x" with " ", and remove multiple spaces
    return normalized.replace(/x/g, " ").replace(/ +/g, "");
  };

  const getUniqueNames = (animes) => {
    var nomes = [];
    var uniqueNames = new Set(); // Use a Set to ensure uniqueness

    animes.forEach((element) => {
      const cleanNome1 = normalizeAndClean(element.nome);
      const cleanNome2 = element.nome2
        ? normalizeAndClean(element.nome2)
        : null;

      // Add cleanNome1 if it's unique
      if (cleanNome1 && !uniqueNames.has(cleanNome1)) {
        uniqueNames.add(cleanNome1);
        nomes.push(element.nome);
      }

      // Add cleanNome2 if it's unique
      if (cleanNome2 && !uniqueNames.has(cleanNome2)) {
        uniqueNames.add(cleanNome2);
        nomes.push(element.nome2);
      }
    });

    return nomes;
  };

  const getRandomAnime = (possibleAnime) => {
    const randomIndex = Math.floor(Math.random() * possibleAnime.length);
    return possibleAnime[randomIndex];
  };

  const start = async () => {
    const alreadyGuessedAnimeNames = alreadyGuessed.map(
      (anime) => anime.anime
    );
    const possibleAnime = animeList.filter(
      (anime) => !alreadyGuessedAnimeNames.includes(anime.nome)
    );

    // if there is no anime in cache
    if (!current) {
      // Get a new anime
      const randomAnime = getRandomAnime(possibleAnime);
      dispatch(setCurrent(randomAnime));
      const randomReview = randomAnime.reviews[
        Math.floor(Math.random() * randomAnime.reviews.length)
      ];
      dispatch(setCurrentReview(randomReview));
    }

    // Get all anime names for the autocomplete
    setAnimeNames(getUniqueNames(possibleAnime));

    setIsLoading(false);
  };

  const selectName = async (name) => {
    setGuess(name);
  };

  const tryGuess = async () => {
    if (!guess) return;

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
      dispatch(setFinished(guessNumber === 5));
    }
  };

  const reset = async () => {
    setIsLoading(true);
    // while loading
    {
      // Add the current anime and if user got it to the list of already guessed animes
      const guessedAnime = {
        anime: current.nome,
        isCorrect: correct,
      };
      // remove the first animes of the list until there is only 10
      const updatedAlreadyGuessed =[...alreadyGuessed, guessedAnime]
      dispatch(setAlreadyGuessed(updatedAlreadyGuessed));

      // Get a new anime
      const alreadyGuessedAnimeNames = alreadyGuessed.map(
        (anime) => anime.anime
      );
      const possibleAnime = animeList.filter(
        (anime) => !alreadyGuessedAnimeNames.includes(anime.nome)
      );
      setAnimeNames(getUniqueNames(possibleAnime));
      const randomAnime = getRandomAnime(possibleAnime);
      dispatch(setCurrent(randomAnime));
      const randomReview = randomAnime.reviews[
        Math.floor(Math.random() * randomAnime.reviews.length)
      ];
      dispatch(setCurrentReview(randomReview));

      setGuess("");
      dispatch(resetGuesses());
    }
    setIsLoading(false);
  };

  const skipGuess = async () => {
    if (guessNumber <= 5) {
      // Add 1 to the current guess number and save it in cache
      dispatch(setGuessNumber(guessNumber + 1));
      // set finish flag
      dispatch(setFinished(guessNumber === 5));
    }
  };

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isLoading && (
        <WidgetWrapper
          display="flex"
          flexDirection="column"
          gap="1rem"
          height="100%"
        >
          {/* Anime cover image (or its placeholder) */}
          <AnimeImage image={current.cover} finished={finished} />

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
              currentReview={currentReview}
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
