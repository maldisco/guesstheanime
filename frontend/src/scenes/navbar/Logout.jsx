import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetUser } from "state";

function Logout({ isOpen, onClose }) {
  const dispatch = useDispatch();

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h1">Change user</Typography>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" overflow="auto" gap="2rem">
          <Typography variant="h5" textAlign="center">
            Are you sure you wanna change user? All your progress will be lost.
          </Typography>
          <Box display="flex" justifyContent="space-evenly" alignItems="center">
            <Button
              variant="contained"
              sx={{ mx: "10px", fontWeight: "bold" }}
              size="large"
              onClick={() => {
                onClose();
                dispatch(resetUser());
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              sx={{ mx: "10px", fontWeight: "bold" }}
              size="large"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default Logout;
