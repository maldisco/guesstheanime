import { Typography, useTheme, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Leaderboard from "scenes/navbar/Leaderboard";
import History from "./History";
import { useState } from "react";
import SakuraFlower from "images/sakura_flower.png";
import Logout from "./Logout";

const NavBar = ({animeList}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const alt = theme.palette.background.alt;

  return (
    <FlexBetween padding="1rem" backgroundColor={alt} position="fixed" top="0" width="100vw">
      <FlexBetween
        gap="0.5rem"
        onClick={() => navigate("/")}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <img width="50px" height="auto" alt="sakura" src={SakuraFlower} />
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
        >
          Guess the アニメ
        </Typography>
      </FlexBetween>

      <FlexBetween gap="1rem">
        <IconButton onClick={() => setIsHistoryOpen(true)}>
          <HistoryIcon
            sx={{
              color: theme.palette.mode === "dark" ? "default" : dark,
              fontSize: "25px",
            }}
          />
        </IconButton>
        <IconButton onClick={() => setIsLeaderboardOpen(true)}>
          <LeaderboardIcon
            sx={{
              color: theme.palette.mode === "dark" ? "default" : dark,
              fontSize: "25px",
            }}
          />
        </IconButton>
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkModeIcon sx={{ fontSize: "25px" }} />
          ) : (
            <LightModeIcon sx={{ color: dark, fontSize: "25px" }} />
          )}
        </IconButton>
        {animeList.length > 0 && (
          <IconButton onClick={() => setIsLogoutOpen(true)}>
            <LogoutIcon
              sx={{
                color: theme.palette.mode === "dark" ? "default" : dark,
                fontSize: "25px",
              }}
            />
          </IconButton>
        )}
      </FlexBetween>

      <Leaderboard
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />
      <History isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
      <Logout isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
    </FlexBetween>
  );
};

export default NavBar;
