import { Typography, Box, Button } from "@mui/material";

const ResultFeedback = ({ correct, onClickNext }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      alignItems="center"
    >
      <Typography color={correct ? "green" : "red"} variant="pageNumber" fontSize="30px">
        {correct
          ? "Parabéns! Você acertou!"
          : `Não foi dessa vez... `}
      </Typography>
      <Box>
        <Button
          variant="contained"
          sx={{ mx: "10px" }}
          size="large"
          onClick={() => onClickNext()}
        >
          Próximo
        </Button>
      </Box>
    </Box>
  );
};

export default ResultFeedback;
