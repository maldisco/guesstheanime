import { Box, Typography } from "@mui/material";

/**
 * A component that displays information in a box with a title.
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the box.
 * @param {string} props.information - The information to be displayed in the box.
 * @param {boolean} [props.innerHtml=false] - Whether the information should be rendered as inner HTML or not.
 * @returns {JSX.Element} - The InfoBox component.
 */
const InfoBox = ({ title, information }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      flexDirection="column"
    >
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>

      <Typography variant="h5">{information}</Typography>
    </Box>
  );
};

export default InfoBox;
