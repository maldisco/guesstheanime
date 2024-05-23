import { Box, useTheme } from "@mui/material";
import Navbar from "scenes/navbar";
import Footer from "scenes/footer";
import AnimeQuiz from "widgets/AnimeQuiz";
import Register from "scenes/register";
import { useSelector } from "react-redux";

const HomePage = () => {
  // Redux variables (cache)
  const {
    guessNumber,
    previousGuesses,
    current,
    alreadyGuessed,
    finished,
    correct,
    animeList,
    currentReview,
    tipsNumber,
    tipsColor
  } = useSelector((state) => state);
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      backgroundColor={theme.palette.background.dark}
    >
      <Navbar animeList={animeList} />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        justifyContent="center"
        mt="5rem"
      >
        <Box flexBasis="70%" maxWidth="70%">
          {animeList.length > 0 ? (
            <AnimeQuiz
              guessNumber={guessNumber}
              previousGuesses={previousGuesses}
              current={current}
              currentReview={currentReview}
              alreadyGuessed={alreadyGuessed}
              finished={finished}
              correct={correct}
              animeList={animeList}
              tipsNumber={tipsNumber}
              tipsColor={tipsColor}
            />
          ) : (
            <Register />
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
