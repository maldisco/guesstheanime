import { Dialog, DialogTitle, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
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
  const alt = theme.palette.background.alt;

  const oneWidth = `${(correctGuesses[1] / (maxGuesses || 1) || 0.02) * 100}%`;
  const twoWidth = `${(correctGuesses[2] / (maxGuesses || 1) || 0.02) * 100}%`;
  const threeWidth = `${
    (correctGuesses[3] / (maxGuesses || 1) || 0.02) * 100
  }%`;
  const fourWidth = `${(correctGuesses[4] / (maxGuesses || 1) || 0.02) * 100}%`;
  const fiveWidth = `${(correctGuesses[5] / (maxGuesses || 1) || 0.02) * 100}%`;
  const sixWidth = `${(correctGuesses[6] / (maxGuesses || 1) || 0.02) * 100}%`;

  useEffect(() => {
    setTotalWins(
      Object.values(correctGuesses).reduce((acc, curr) => acc + curr, 0)
    );
    setWinPercentage(Math.floor(totalWins / totalGuesses) * 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alreadyGuessed]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h1">Estatísticas</Typography>
      </DialogTitle>
      <Box p="1rem" display="flex" flexDirection="column" gap="1rem">
        <FlexBetween padding="1rem 6%">
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
              Total
            </Typography>
          </Box>

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
              Acertos
            </Typography>
          </Box>
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
              % Vitória
            </Typography>
          </Box>
        </FlexBetween>
        <Box fullWidth display="flex" justifyContent="center" alignItems="center">
          <Typography fontWeight="bold" variant="h4">
            Distribuição de acertos
          </Typography>
        </Box>

        <Box display="flex" gap="1rem">
          <Typography>1</Typography>
          <Box backgroundColor={alt} width={oneWidth}>
            {correctGuesses[1]}
          </Box>
        </Box>
        <Box display="flex" gap="1rem">
          <Typography>2</Typography>
          <Box backgroundColor={alt} width={twoWidth}>
            {correctGuesses[2]}
          </Box>
        </Box>
        <Box display="flex" gap="1rem">
          <Typography>3</Typography>
          <Box backgroundColor={alt} width={threeWidth}>
            {correctGuesses[3]}
          </Box>
        </Box>
        <Box display="flex" gap="1rem">
          <Typography>4</Typography>
          <Box backgroundColor={alt} width={fourWidth}>
            {correctGuesses[4]}
          </Box>
        </Box>
        <Box display="flex" gap="1rem">
          <Typography>5</Typography>
          <Box backgroundColor={alt} width={fiveWidth}>
            {correctGuesses[5]}
          </Box>
        </Box>
        <Box display="flex" gap="1rem">
          <Typography>6</Typography>
          <Box backgroundColor={alt} width={sixWidth}>
            {correctGuesses[6]}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default Leaderboard;
