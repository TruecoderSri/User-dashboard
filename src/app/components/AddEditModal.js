import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import UserForm from "./UserForm";

const AddEditModal = ({
  open,
  onClose,
  form,
  handleInputChange,
  handleSubmit,
  resetForm,
  editing,
}) => {
  return (
    // Material UI Dialog component to create a modal
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Dialog title, conditionally displays 'Edit User' or 'Add User' */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: "2em",
          color: "blue",
        }}
      >
        {editing ? "Edit User" : "Add User"}
      </DialogTitle>

      {/* Dialog content includes the UserForm component */}
      <DialogContent>
        <UserForm
          form={form}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          editing={editing}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddEditModal;

/**
 Assumptions
1.form: The form data that needs to be displayed and edited inside the modal.
2.handleInputChange: Function that handles changes to the form fields.
3.handleSubmit: Function that handles the form submission.
4.resetForm: Function that resets the form to its initial state.
5.editing: Boolean prop indicating if the modal is for editing an existing user or adding a new one. 
 */
