import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const SuccessModal = ({ open, setOpen, message }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {message}
        <CheckCircle
          sx={{
            marginLeft: "4px",
            marginBottom: "4px",
            color: "green",
          }}
        />
      </DialogTitle>

      <DialogActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessModal;

/*
Assumptions

1.message: The message prop is expected to be a string that will be displayed in the modal.
2.onClose: The onClose prop is a function used to close the modal when the "OK" button is clicked.

*/
