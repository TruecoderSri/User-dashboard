import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import { fetchUsers, addUser, editUser, deleteUser } from "@/app/utils/api";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle add/edit user
  const handleSubmit = async (userData) => {
    try {
      if (isEditing) {
        const updatedUser = await editUser(editingUser.id, userData);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        setIsEditing(false);
        setEditingUser(null);
      } else {
        const newUser = await addUser(userData);
        setUsers((prevUsers) => [...prevUsers, newUser]);
      }
    } catch (error) {
      console.error("Error handling user:", error);
    }
  };

  // Handle delete user
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
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
