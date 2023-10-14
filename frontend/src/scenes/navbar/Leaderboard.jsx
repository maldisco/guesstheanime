import { Dialog, DialogTitle, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Leaderboard({ isOpen, onClose }) {
  const correctGuesses = useSelector((state) => state.correctGuesses);
  const maxGuesses = Math.max(...Object.values(correctGuesses));
  const alreadyGuessed = useSelector((state) => state.alreadyGuessed);
  const totalGuesses = alreadyGuessed.length;
  const [winPercentage, setWinPercentage] = useState(0);
  const [totalWins, setTotalWins] = useState(0);

  const theme = useTheme();
  const alt = theme.palette.primary.light;

  const barWidths = {
    1: `${(correctGuesses[1] / (maxGuesses || 1) || 0.02) * 100}%`,
    2: `${(correctGuesses[2] / (maxGuesses || 1) || 0.02) * 100}%`,
    3: `${(correctGuesses[3] / (maxGuesses || 1) || 0.02) * 100}%`,
    4: `${(correctGuesses[4] / (maxGuesses || 1) || 0.02) * 100}%`,
    5: `${(correctGuesses[5] / (maxGuesses || 1) || 0.02) * 100}%`,
    6: `${(correctGuesses[6] / (maxGuesses || 1) || 0.02) * 100}%`,
  };

  useEffect(() => {
    const wins = Object.values(correctGuesses).reduce(
      (acc, curr) => acc + curr,
      0
    );
    setTotalWins(wins);
    setWinPercentage(Math.floor((wins / totalGuesses) * 100) || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alreadyGuessed]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h1">Statistics</Typography>
      </DialogTitle>
      <Box p="1rem" display="flex" flexDirection="column" gap="1rem">
        <FlexBetween padding="1rem 6%">
          {/* Total de animes jogados */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)">
              {totalGuesses}
            </Typography>
            <Typography
              fontWeight="bold"
              fontSize="clamp(0.5rem, 1rem, 1.15rem)"
            >
              Total Guessed
            </Typography>
          </Box>

          {/* Total de acertos */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)">
              {totalWins}
            </Typography>
            <Typography
              fontWeight="bold"
              fontSize="clamp(0.5rem, 1rem, 1.15rem)"
            >
              Total Wins
            </Typography>
          </Box>

          {/* % de vitória */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)">
              {winPercentage} %
            </Typography>
            <Typography
              fontWeight="bold"
              fontSize="clamp(0.5rem, 1rem, 1.15rem)"
            >
              % Win
            </Typography>
          </Box>
        </FlexBetween>

        {/* Distribuição de acertos e barras */}
        <Box
          fullWidth
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography fontWeight="bold" variant="h4">
            Distribution of correct guesses
          </Typography>
        </Box>

        {Array.from({ length: 5 }, (_, index) => (
          <Box display="flex" gap="1rem" key={index}>
            <Typography>{index + 1}</Typography>
            <Box backgroundColor={alt} width={barWidths[index + 1]} px=".1rem">
              {correctGuesses[index + 1]}
            </Box>
          </Box>
        ))}
      </Box>
    </Dialog>
  );
}

export default Leaderboard;
