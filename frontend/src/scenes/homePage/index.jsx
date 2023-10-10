import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import Footer from "scenes/footer";
import AnimeQuiz from "widgets/AnimeQuiz";
import Register from "scenes/register.jsx";
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
  } = useSelector((state) => state);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar animeList={animeList}/>
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="5rem"
        justifyContent="center"
      >
        <Box flexBasis="60%" maxWidth="60%">
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
