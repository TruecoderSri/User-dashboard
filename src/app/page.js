import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import SuccessModal from "./SuccessModal";
import { fetchUsers, addUser, editUser, deleteUser } from "@/app/utils/api";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleSubmit = async (userData) => {
    try {
      if (isEditing) {
        const updatedUser = await editUser(editingUser.id, userData);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        setSuccessMessage("User updated successfully!");
      } else {
        const newUser = await addUser(userData);
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setSuccessMessage("User added successfully!");
      }
      setShowSuccessModal(true);
      setIsEditing(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Error handling user:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setSuccessMessage("User deleted successfully!");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
      {showSuccessModal && (
        <SuccessModal
          message={successMessage}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
}
