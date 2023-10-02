import { Typography, Box, Button } from "@mui/material";

const ResultFeedback = ({ correct, animeName, onClickNext }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      alignItems="center"
    >
      <Typography color={correct ? "green" : "red"} variant="h4">
        {correct
          ? "Parabéns! Você acertou!"
          : `Acabaram as tentativas... A resposta é `}
        {correct || <strong>{animeName}</strong>}
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
