import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
} from "@mui/material";

export default function ErrorModal({ open, setOpen, errorMessage }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>{errorMessage}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/**
Assumptions
1.message: The message prop is expected to be a string containing the error message to be displayed in the modal.
2.onClose: The onClose prop is a function that will be executed when the "Close" button is clicked to close the modal.

 */
