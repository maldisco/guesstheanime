import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import Footer from "scenes/footer";
import AnimeQuiz from "widgets/AnimeQuiz";
import PastGuesses from "widgets/PastGuesses";
import PastTips from "widgets/PastTips";
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
  } = useSelector((state) => state);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="5rem"
        justifyContent="flex-start"
      >
        <Box flexBasis="15%" maxWidth="15%">
          {alreadyGuessed.length > 0 && (
            <PastGuesses alreadyGuessed={alreadyGuessed} />
          )}
        </Box>
        <Box flexBasis="60%" maxWidth="60%">
          <AnimeQuiz
            guessNumber={guessNumber}
            previousGuesses={previousGuesses}
            current={current}
            alreadyGuessed={alreadyGuessed}
            finished={finished}
            correct={correct}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
