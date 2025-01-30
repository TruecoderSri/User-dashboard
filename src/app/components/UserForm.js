import React from "react";
import { Button, Input, FormLabel } from "@mui/material";

export default function UserForm({
  form,
  handleInputChange,
  handleSubmit,
  editing,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* First Name Input */}
      <div>
        <FormLabel htmlFor="firstName">
          First Name <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          value={form.firstName}
          onChange={handleInputChange}
          required
          fullWidth
        />
      </div>

      {/* Last Name Input */}
      <div>
        <FormLabel htmlFor="lastName">
          Last Name <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          value={form.lastName}
          onChange={handleInputChange}
          fullWidth
        />
      </div>

      {/* Email Input */}
      <div>
        <FormLabel htmlFor="email">
          Email <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          required
          fullWidth
        />
      </div>

      {/* Department Input */}
      <div>
        <FormLabel htmlFor="department">
          Department <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          type="text"
          id="department"
          name="department"
          value={form.company.name}
          onChange={handleInputChange}
          required
          fullWidth
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button type="submit" variant="contained">
          {editing ? "Update User" : "Add User"}
        </Button>
      </div>
    </form>
  );
}
