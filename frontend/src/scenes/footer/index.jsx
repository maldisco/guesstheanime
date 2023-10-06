import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  const theme = useTheme();
  const twitterProfileUrl = "https://twitter.com/maldisco_";

  return (
    <FlexBetween
      backgroundColor={theme.palette.background.alt}
      padding="1rem 6%"
      marginTop="auto"
      display="flex"
    >
      <FlexBetween gap="1rem">
        <a href={twitterProfileUrl} target="_blank" rel="noopener noreferrer">
          <TwitterIcon
            sx={{
              color: theme.palette.mode === "dark" ? "white" : "black",
              fontSize: "2rem",
            }}
          />
        </a>
        <Typography>@maldisco_</Typography>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Footer;
