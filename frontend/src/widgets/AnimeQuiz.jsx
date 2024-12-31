import { Box } from "@mui/material";
import {
  setCurrent,
  setAlreadyGuessed,
  addCorrectGuess,
  setGuessNumber,
  setPreviousGuesses,
  setFinished,
  setCorrect,
  resetGuesses,
  setTipsNumber,
  setTipsColor,
} from "state";
import WidgetWrapper from "components/WidgetWrapper";
import GuessCounter from "components/GuessCounter";
import ResultFeedback from "components/ResultFeedback";
import AnimeInformation from "components/AnimeInformation";
import PreviousGuesses from "components/PreviousGuesses";
import GuessInput from "components/GuessInput";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";


const AnimeQuiz = ({
  guessNumber,
  previousGuesses,
  current,
  alreadyGuessed,
  finished,
  correct,
  animeList,
  tipsNumber,
  tipsColor,
}) => {
  const dispatch = useDispatch();

  // State variables
  const [animeNames, setAnimeNames] = useState([]);
  const [guess, setGuess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingGuess, setIsProcessingGuess] = useState(false);

  const normalizeAndClean = (str) => {
    if (!str) return null;
    const normalized = str
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .trim()
      .toLowerCase();
    // Replace "x" with " ", and remove multiple spaces
    return normalized.replace(/ +/g, "");
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
      } else if (cleanNome2 && !uniqueNames.has(cleanNome2)) {
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

  const randomizeTips = () => {
    let numbers = [1, 2, 2, 3, 3, 4, 5, 5];
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    let tips = {
      review: 0,
      studio: 0,
      genres: 0,
      format: 0,
      popularity: 0,
      score: 0,
      tags: 0,
      recommendations: 0,
    };

    Object.keys(tips).forEach((key, index) => {
      tips[key] = numbers[index];
    });

    let colorOptions = ["black", "white", "white"];
    let tipsColor = {
      review: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      studio: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      genres: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      format: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      popularity: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      score: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      tags: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      recommendations:
        colorOptions[Math.floor(Math.random() * colorOptions.length)],
    };

    dispatch(setTipsColor(tipsColor));
    dispatch(setTipsNumber(tips));
  };

  const start = async () => {
    const alreadyGuessedAnimeNames = alreadyGuessed.map((anime) => anime.anime);
    const possibleAnime = animeList.filter(
      (anime) => !alreadyGuessedAnimeNames.includes(anime.nome)
    );

    if (!current) {
      const randomAnime = getRandomAnime(possibleAnime);
      dispatch(setCurrent(randomAnime));
      randomizeTips();
    }

    setAnimeNames(getUniqueNames(possibleAnime));
    setIsLoading(false);
  };

  const selectName = async (name) => {
    setGuess(name);
  };

  const tryGuess = async () => {
    if (!guess) return;
    setIsProcessingGuess(true);
    if (guess === current.nome || guess === current.nome2) {
      dispatch(addCorrectGuess(guessNumber));
      dispatch(setCorrect(true));
      dispatch(setFinished(true));
      dispatch(setPreviousGuesses([...previousGuesses, guess]));
    } else {
      dispatch(setGuessNumber(guessNumber + 1));
      dispatch(setPreviousGuesses([...previousGuesses, guess]));
      dispatch(setFinished(guessNumber === 5));
    }
    setIsProcessingGuess(false);
  };

  const reset = async () => {
    setIsLoading(true);
    {
      const guessedAnime = {
        anime: current.nome,
        isCorrect: correct,
      };

      const updatedAlreadyGuessed = [...alreadyGuessed, guessedAnime];
      dispatch(setAlreadyGuessed(updatedAlreadyGuessed));

      const alreadyGuessedAnimeNames = alreadyGuessed.map(
        (anime) => anime.anime
      );
      const possibleAnime = animeList.filter(
        (anime) => !alreadyGuessedAnimeNames.includes(anime.nome)
      );
      setAnimeNames(getUniqueNames(possibleAnime));
      const randomAnime = getRandomAnime(possibleAnime);
      dispatch(setCurrent(randomAnime));

      randomizeTips();

      setGuess("");
      dispatch(resetGuesses());
    }
    setIsLoading(false);
  };

  const skipGuess = async () => {
    if (guessNumber <= 5) {
      dispatch(setGuessNumber(guessNumber + 1));
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
          gap="2vh"
          justifyContent="center"
          alignItems="center"
        >
          <AnimeInformation
            current={current}
            finished={finished}
            tipsNumber={tipsNumber}
            tipsColor={tipsColor}
            guessNumber={guessNumber}
            alreadyGuessed={alreadyGuessed}
          />

          {!finished ? (
            <Box display="flex" flexDirection="column" gap="2vh">
              {/* GUESS COUNTER */}
              <GuessCounter
                guessNumber={guessNumber}
                finished={finished}
                correct={correct}
                onSkip={skipGuess}
              />
              {/* GUESS INPUT */}
              <GuessInput
                onNameSelect={selectName}
                tryGuess={tryGuess}
                animeNames={animeNames}
                isProcessingGuess={isProcessingGuess}
              />

              {/* PREVIOUS GUESSES */}
              <PreviousGuesses previousGuesses={previousGuesses} />
            </Box>
          ) : (
            <ResultFeedback
              correct={correct}
              animeName={current.nome}
              onClickNext={reset}
            />
          )}
        </WidgetWrapper>
      )}
    </>
  );
};

export default AnimeQuiz;
