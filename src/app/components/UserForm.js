"use client";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

export default function UserForm({ setUsers }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!form.firstName || !form.lastName || !form.email || !form.companyName) {
      alert("All fields are required");
      return;
    }

    // Submit the form and update users list
    const newUser = {
      id: users.length + 1,
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      company: { name: form.companyName },
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setForm({ firstName: "", lastName: "", email: "", companyName: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-4">
        <TextField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleInputChange}
          fullWidth
        />
      </div>
      <div className="flex gap-4 mt-4">
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Company Name"
          name="companyName"
          value={form.companyName}
          onChange={handleInputChange}
          fullWidth
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Add User
      </Button>
    </form>
  );
}
