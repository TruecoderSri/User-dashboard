import React from "react";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function UserTable({ users, handleEdit, handleDelete }) {
  return (
    <div className="overflow-x-auto">
      {/* Table container with horizontal scrolling if needed */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          {/* Table Header */}
          <tr className="bg-gray-200">
            <th className="border-none px-4 py-2">ID</th>
            <th className="border-none px-4 py-2">Name</th>
            <th className="border-none px-4 py-2">Email</th>
            <th className="border-none px-4 py-2">Department</th>
            <th className="border-none px-4 py-2">Actions</th>{" "}
            {/* Column for actions like edit and delete */}
          </tr>
        </thead>
        <tbody>
          {/* Check if there are users */}
          {users && users.length > 0 ? (
            // Loop through users array and create a row for each user
            users.map((user) => (
              <tr key={user.id} className="text-center">
                {/* User ID */}
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                {/* User Name */}
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                {/* User Email */}
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                {/* User Department, fallback to "N/A" if not available */}
                <td className="border border-gray-300 px-4 py-2">
                  {user.company?.name || "N/A"}
                </td>
                {/* Actions for editing or deleting the user */}
                <td className="border border-gray-300 px-4 py-2">
                  {/* Edit button: Triggers handleEdit when clicked */}
                  <IconButton
                    onClick={() => handleEdit(user)} // Pass user object for editing
                    color="primary"
                    className="mr-2"
                  >
                    <EditIcon />
                  </IconButton>
                  {/* Delete button: Triggers handleDelete with user id */}
                  <IconButton
                    onClick={() => handleDelete(user.id)} // Pass user id for deletion
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))
          ) : (
            // Message if no users are available
            <tr>
              <td colSpan="5" className="text-center py-4">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/*
Assumptions

1.users: The users prop is an array of user objects, each containing id, name, email, and a nested company object with a name field.
2.handleEdit: This function is passed as a prop and is responsible for handling the logic when a user clicks on the edit button. It takes a user object as its argument.
3.handleDelete: This function is passed as a prop and handles the deletion of a user when the delete button is clicked. It expects the user's id as its argument.
*/
