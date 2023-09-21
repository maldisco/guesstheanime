import { Box, Typography, Button, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "scenes/navbar";
import WidgetWrapper from "components/WidgetWrapper";
import AnimeImage from "components/AnimeImage";
import AnimeNameAutocomplete from "components/AnimeNameAutocomplete";
import { useEffect, useState } from "react";
import {
  setCurrent,
  setAlreadyGuessed,
  addCorrectGuess,
  setGuessNumber,
  setGuessPrevious,
} from "state";

const HomePage = () => {
  const guessNumber = useSelector((state) => state.guessNumber);
  const guessPrevious = useSelector((state) => state.guessPrevious);

  const [anime, setAnime] = useState({});
  const [animeNames, setAnimeNames] = useState([]);
  const [guess, setGuess] = useState("");
  const [currentGuessNumber, setcurrentGuessNumber] = useState(guessNumber);
  const [isLoading, setIsLoading] = useState(true);
  const [correct, setCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [previousGuesses, setPreviousGuesses] = useState(guessPrevious);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const alt = theme.palette.background.alt;

  const current = useSelector((state) => state.current);
  const alreadyGuessed = useSelector((state) => state.alreadyGuessed);
  const dispatch = useDispatch();

  const getAnime = async () => {
    if (!current) {
      const response = await fetch(
        "http://localhost:3001/api/animes/aleatorio",
        {
          method: "POST",
          body: { excludedIds: JSON.stringify({ alreadyGuessed }) },
        }
      );
      const data = await response.json();
      setAnime(data);
      dispatch(setCurrent(data));
    } else {
      setAnime(current);
    }

    const response2 = await fetch("http://localhost:3001/api/animes/nomes");
    const data2 = await response2.json();
    setAnimeNames(data2);

    setIsLoading(false);
  };

  const selectName = async (name) => {
    setGuess(name);
  };

  const tryGuess = async () => {
    if (guess === anime.nome) {
      dispatch(addCorrectGuess(currentGuessNumber));
      setCorrect(true);
      setFinished(true);
      setPreviousGuesses([...previousGuesses, guess]);
      dispatch(setGuessNumber(currentGuessNumber));
      dispatch(setGuessPrevious([...previousGuesses, guess]));
    } else {
      dispatch(setGuessNumber(currentGuessNumber + 1));
      dispatch(setGuessPrevious([...previousGuesses, guess]));
      setcurrentGuessNumber(currentGuessNumber + 1);
      setFinished(currentGuessNumber === 6);
      setPreviousGuesses([...previousGuesses, guess]);
    }
  };

  const reset = async () => {
    setIsLoading(true);

    dispatch(setAlreadyGuessed([...alreadyGuessed, anime._id]));

    const response = await fetch("http://localhost:3001/api/animes/aleatorio", {
      method: "POST",
      body: { excludedIds: JSON.stringify({ alreadyGuessed }) },
    });
    const data = await response.json();
    setAnime(data);
    dispatch(setCurrent(data));
    setcurrentGuessNumber(1);
    setGuess("");
    setCorrect(false);
    setFinished(false);
    setPreviousGuesses([]);
    dispatch(setGuessNumber(1));
    dispatch(setGuessPrevious([]));

    setIsLoading(false);
  };

  const skipGuess = async () => {
    if (currentGuessNumber <= 6) {
      dispatch(setGuessNumber(currentGuessNumber + 1));
      setcurrentGuessNumber(currentGuessNumber + 1);
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
              <Box display="flex" justifyContent="center" width="100%">
                {finished && <AnimeImage image={anime.capa} />}
                {!finished && (
                  <Box
                    width="253px"
                    height="358px"
                    backgroundColor="black"
                    borderRadius="1rem"
                  />
                )}
              </Box>
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
                        index + 1 <= currentGuessNumber ? neutralLight : alt,
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
                >
                  Pular
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" width="100%">
              </Box>
              <Box display="flex" justifyContent="center" width="100%">
                <Typography variant="h5">
                  Review: {anime.resumo}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" width="100%">
                {currentGuessNumber > 1 && (
                  <Typography variant="h5">
                    {anime.studios.length === 1
                      ? `Estúdio: ${anime.studios[0]}`
                      : `Estúdios: ${anime.studios
                          .map((studio) => studio)
                          .join(" | ")}`}
                  </Typography>
                )}
              </Box>
              {currentGuessNumber > 2 && (
                <Box display="flex" justifyContent="center" width="100%">
                  <Typography variant="h5">
                    Gêneros: {anime.generos.map((genre) => genre).join(" | ")}
                  </Typography>
                </Box>
              )}
              {currentGuessNumber > 3 && (
                <Box display="flex" justifyContent="center" width="100%">
                  <Typography variant="h5">
                    Tags: {anime.tags.map((tag) => tag).join(" | ")}
                  </Typography>
                </Box>
              )}
              {currentGuessNumber > 4 && (
                <Box display="flex" justifyContent="center" width="100%">
                  <Typography variant="h5">
                    Ano de lançamento: {anime.ano}
                  </Typography>
                </Box>
              )}
              {currentGuessNumber > 5 && (
                <Box display="flex" justifyContent="center" width="100%">
                  <Typography variant="h5">
                    Nome dos personagens:{" "}
                    {anime.personagens
                      .map((personagem) => personagem)
                      .join(" | ")}
                  </Typography>
                </Box>
              )}
              {!finished && (
                <Box
                  display="flex"
                  justifyContent="center"
                  width="100%"
                  alignItems="center"
                >
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
                </Box>
              )}
              {finished && correct && (
                <Box
                  display="flex"
                  justifyContent="center"
                  width="100%"
                  alignItems="center"
                >
                  <Typography color="primary" variant="h4">
                    Acertou em {currentGuessNumber} tentativas!
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
                </Box>
              )}
              {finished && !correct && (
                <Box
                  display="flex"
                  justifyContent="center"
                  width="100%"
                  alignItems="center"
                >
                  <Typography color="red" variant="h4">
                    Acabaram as tentativas... A resposta é{" "}
                    <strong>{anime.nome}</strong>.
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
                </Box>
              )}
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
