import { Dialog, DialogTitle, DialogContent, useTheme } from "@mui/material";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

function History({ isOpen, onClose }) {
  const alreadyGuessed = useSelector((state) => state.alreadyGuessed);
  const theme = useTheme();

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h1">Guess History</Typography>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" overflow="auto">
          {alreadyGuessed
            .slice(-10)
            .reverse()
            .map(({ anime, isCorrect }) => (
              <Box
                display="flex"
                justifyContent="space-between"
                key={anime}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.neutral.dark,

                    "& .typo": {
                      color: theme.palette.background.default,
                    },

                    "& .icon": {
                      color: theme.palette.background.default,
                    },
                  },
                }}
                borderRadius=".2rem"
                p=".2rem"
              >
                <Typography
                  variant="h4"
                  sx={{
                    maxWidth: "80%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  className="typo"
                  color={theme.palette.neutral.dark}
                >
                  {anime}
                </Typography>
                {isCorrect ? (
                  <CheckIcon
                    sx={{ color: theme.palette.neutral.dark }}
                    className="icon"
                  />
                ) : (
                  <ClearIcon
                    sx={{ color: theme.palette.neutral.dark }}
                    className="icon"
                  />
                )}
              </Box>
            ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default History;
