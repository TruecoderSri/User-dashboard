import React from "react";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function UserTable({ users, handleEdit, handleDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border-none px-4 py-2">ID</th>
            <th className="border-none px-4 py-2">Name</th>
            <th className="border-none px-4 py-2">Email</th>
            <th className="border-none px-4 py-2">Department</th>
            <th className="border-none px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.company?.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <IconButton
                    onClick={() => handleEdit(user)}
                    color="primary"
                    className="mr-2"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))
          ) : (
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
