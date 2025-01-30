import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import { API_URL } from "@/app/utils/api";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // To track if we are in edit mode
  const [editingUser, setEditingUser] = useState(null); // To track the user being edited

  // Fetch the list of users from the API when the page loads
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle form submit for adding, editing, or deleting users
  const handleSubmit = async (userData) => {
    if (isEditing) {
      // If editing, update the user
      try {
        const response = await fetch(`${API_URL}/users/${editingUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const updatedUser = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        setIsEditing(false); // Reset editing state
        setEditingUser(null); // Clear the editing user
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      // If adding, create a new user
      try {
        const response = await fetch(`${API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  // Handle delete user
  const handleDelete = async (userId) => {
    try {
      await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle edit user
  const handleEdit = (user) => {
    setIsEditing(true);
    setEditingUser(user);
  };

  return (
    <div className="container mx-auto p-4">
      <UserForm
        setUsers={setUsers}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        editingUser={editingUser}
      />
      <UserTable
        users={users}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}
