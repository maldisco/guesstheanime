import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import AnimeQuiz from "widgets/AnimeQuiz";
import PastGuesses from "widgets/PastGuesses";
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
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="5rem"
        justifyContent="flex-start"
      >
        <Box flexBasis="15%" maxWidth="15%">
          <PastGuesses alreadyGuessed={alreadyGuessed} />
        </Box>
        <Box flexBasis="50%" maxWidth="50%">
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
    </Box>
  );
};

export default HomePage;
