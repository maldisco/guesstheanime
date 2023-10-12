import { Box, Typography } from "@mui/material";
import './speechBubble.css'

const SpeechBubble = ({ text, direction }) => {
    const bubbleClass = `bubble speech `

  return (
    <Box className={bubbleClass}>
      <Typography color="black" variant="h4">{text}</Typography>
    </Box>
  );
};

export default SpeechBubble;
