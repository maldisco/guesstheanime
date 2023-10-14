import { Box, Typography } from "@mui/material";


/**
 * A component that displays an information box with a title and information.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the information box.
 * @param {string} props.information - The information to be displayed in the box.
 * @param {number} props.guessNumber - The number of guesses made.
 * @param {number} props.tipNumber - The number of tips given.
 * @param {string} [props.top="auto"] - The top position of the box.
 * @param {string} [props.bottom="auto"] - The bottom position of the box.
 * @param {string} [props.left="auto"] - The left position of the box.
 * @param {string} [props.right="auto"] - The right position of the box.
 * @param {string} props.height - The height of the box.
 * @param {string} props.width - The width of the box.
 * @param {string} [props.backgroundColor="white"] - The background color of the box.
 * @returns {JSX.Element} - The InfoBox component.
 */
const InfoBox = ({
  title,
  information,
  guessNumber,
  tipNumber,
  top = "auto",
  bottom =  "auto",
  left = "auto",
  right = "auto",
  height,
  width,
  backgroundColor = "white"
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      position="absolute"
      border="solid 2px black"
      backgroundColor={backgroundColor}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      height={height}
      width={width}
    >
      <Typography variant="h5" fontWeight="bold" color={backgroundColor === "white" ? "black" : "white"} textAlign="center">
        {title}
      </Typography>

      <Typography variant="h6" color={backgroundColor === "white" ? "black" : "white"} textAlign="center">
        {guessNumber >= tipNumber ? information : "?"}
      </Typography>
    </Box>
  );
};

export default InfoBox;
