import { Box, Typography, Button, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "scenes/navbar";
import WidgetWrapper from "components/WidgetWrapper";
import AnimeImage from "components/AnimeImage";
import AnimeInfoBox from "components/AnimeInfoBox";
import AnimeNameAutocomplete from "components/AnimeNameAutocomplete";
import { useEffect, useState } from "react";
import {
  setCurrent,
  setAlreadyGuessed,
  addCorrectGuess,
  setGuessNumber,
  setGuessPrevious,
} from "state";
import axios from "axios";

const HomePage = () => {
  // Redux variables (cache)
  const guessNumber = useSelector((state) => state.guessNumber);
  const guessPrevious = useSelector((state) => state.guessPrevious);
  const current = useSelector((state) => state.current);
  const alreadyGuessed = useSelector((state) => state.alreadyGuessed);
  const dispatch = useDispatch();

  // State variables
  const [anime, setAnime] = useState({});
  const [animeNames, setAnimeNames] = useState([]);
  const [guess, setGuess] = useState("");
  const [currentGuessNumber, setcurrentGuessNumber] = useState(guessNumber);
  const [isLoading, setIsLoading] = useState(true);
  const [correct, setCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [previousGuesses, setPreviousGuesses] = useState(guessPrevious);

  // Material UI theme
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const alt = theme.palette.background.alt;

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
          setAnime(response.data);
          dispatch(setCurrent(response.data));
        });
    } else {
      // if there is an anime in cache
      // set it to state
      setAnime(current);
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
    if (guess === anime.nome || guess === anime.nome2) {
      // Save the correct guess number to cache
      dispatch(addCorrectGuess(currentGuessNumber));
      // set correct flag
      setCorrect(true);
      // set finish flag
      setFinished(true);
      // add guess to previous guesses for user feedback
      setPreviousGuesses([...previousGuesses, guess]);
      // Save current guess number to cache (case user reloads the page)
      dispatch(setGuessNumber(currentGuessNumber));
      // Save current list of previous guesses to cache (same as above)
      dispatch(setGuessPrevious([...previousGuesses, guess]));
    } else {
      // Add 1 to the current guess number and save it in cache
      dispatch(setGuessNumber(currentGuessNumber + 1));
      // Add the current guess to the list of previous guesses and save it in cache
      dispatch(setGuessPrevious([...previousGuesses, guess]));
      // Add 1 to the current guess number and save it in state
      setcurrentGuessNumber(currentGuessNumber + 1);
      // set finish flag
      setFinished(currentGuessNumber === 6);
      // add guess to previous guesses for user feedback
      setPreviousGuesses([...previousGuesses, guess]);
    }
  };

  const reset = async () => {
    setIsLoading(true);
    // while loading
    {
      // Add the current anime id to the list of already guessed animes
      dispatch(setAlreadyGuessed([...alreadyGuessed, anime._id]));

      // Get a new anime
      axios
        .post(
          "http://localhost:3001/api/animes/aleatorio",
          JSON.stringify({ excludedIds: alreadyGuessed }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          setAnime(response.data);
          dispatch(setCurrent(response.data));
        });

      // reset state flags and variables (from cache too)
      setcurrentGuessNumber(1);
      setGuess("");
      setCorrect(false);
      setFinished(false);
      setPreviousGuesses([]);
      dispatch(setGuessNumber(1));
      dispatch(setGuessPrevious([]));
    }
    setIsLoading(false);
  };

  const skipGuess = async () => {
    if (currentGuessNumber <= 6) {
      // Add 1 to the current guess number and save it in cache
      dispatch(setGuessNumber(currentGuessNumber + 1));
      // Add 1 to the current guess number and save it in state
      setcurrentGuessNumber(currentGuessNumber + 1);
      // set finish flag
      setFinished(currentGuessNumber === 6);
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
              {/* Anime cover image (and its placeholder) */}
              <Box display="flex" justifyContent="center" width="100%">
                {finished && <AnimeImage image={anime.capa} />}
                {!finished && (
                  <Box
                    width="253px"
                    height="358px"
                    backgroundColor={theme.palette.background.default}
                    borderRadius="1rem"
                  />
                )}
              </Box>
              <Box display="flex" justifyContent="center" width="100%">
                <Typography variant="h5">Lançamento: {anime.ano}</Typography>
              </Box>

              {/* Number of guesses and skip button */}
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                gap="1rem"
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <Typography
                    sx={{
                      backgroundColor:
                        finished && correct && index + 1 === currentGuessNumber
                          ? "green"
                          : finished && !correct
                          ? "red"
                          : index + 1 <= currentGuessNumber
                          ? neutralLight
                          : alt,
                      borderRadius: "15%",
                      p: "0.5rem",
                    }}
                    fontWeight="bold"
                    key={index}
                  >
                    {index + 1}
                  </Typography>
                ))}
                <Typography
                  onClick={() => skipGuess()}
                  sx={{
                    backgroundColor: neutralLight,
                    borderRadius: "15%",
                    p: "0.5rem",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  fontWeight="bold"
                  disabled={finished}
                >
                  Pular
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                alignItems="center"
              >
                {/* Result feedback and next button */}
                {finished && (
                  <>
                    <Typography color={correct ? "green" : "red"} variant="h4">
                      {correct
                        ? "Parabéns! Você acertou!"
                        : `Acabaram as tentativas... A resposta é `}
                      {correct || <strong>{anime.nome}</strong>}
                    </Typography>
                    <Box>
                      <Button
                        variant="contained"
                        sx={{ mx: "10px" }}
                        size="large"
                        onClick={() => {
                          reset();
                        }}
                      >
                        Próximo
                      </Button>
                    </Box>
                  </>
                )}

                {/* Answer box and button */}
                {!finished && (
                  <>
                    <AnimeNameAutocomplete
                      animeNames={animeNames}
                      onNameSelect={selectName}
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
                  </>
                )}
              </Box>

              {/* Anime information boxes */}
              {!finished && (
                <AnimeInfoBox title="Review" information={anime.resumo} />
              )}
              {!finished && currentGuessNumber > 1 && (
                <Box display="flex" justifyContent="center" width="100%">
                  <AnimeInfoBox title="Estúdio" information={anime.studio} />
                  <AnimeInfoBox
                    title="Gêneros"
                    information={anime.generos
                      .map((genre) => genre)
                      .join(" | ")}
                  />
                </Box>
              )}
              {!finished && currentGuessNumber > 2 && (
                <Box display="flex" justifyContent="center" width="100%">
                  <AnimeInfoBox
                    title="Formato"
                    information={
                      anime.episodios > 1
                        ? `Anime (${anime.episodios} episódios)`
                        : `Filme`
                    }
                  />
                  <AnimeInfoBox
                    title="Popularidade"
                    information={
                      anime.popularidade !== "-"
                        ? `${anime.popularidade}° título mais popular do Anilist`
                        : "Não está entre os 500 mais populares do Anilist"
                    }
                  />
                </Box>
              )}
              {!finished && currentGuessNumber > 3 && (
                <AnimeInfoBox
                  title="Tags"
                  information={anime.tags.join(" | ")}
                />
              )}
              {!finished && currentGuessNumber > 4 && (
                <AnimeInfoBox
                  title="Notas"
                  information={`Filipe: ${anime.score.Filipe} | Tuzzin: ${anime.score.Tuzzin} | Taboada: ${anime.score.Taboada}`}
                />
              )}
              {!finished && currentGuessNumber > 5 && (
                <AnimeInfoBox
                  title="Sinopse"
                  information={anime.desc}
                  innerHtml={true}
                />
              )}

              {/* List of previous guesses */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                width="100%"
                alignItems="center"
              >
                {previousGuesses.map((guess) => (
                  <Typography
                    sx={{
                      backgroundColor: neutralLight,
                      p: "0.5rem",
                      m: "0.1rem",
                      width: "50%",
                    }}
                    fontWeight="bold"
                    textAlign="center"
                    key={guess}
                  >
                    {guess}
                  </Typography>
                ))}
              </Box>
            </WidgetWrapper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
