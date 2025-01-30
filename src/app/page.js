import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import { addUser, editUser, deleteUser } from "@/app/utils/api";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setErrorMessage("Error fetching users.");
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
      setIsEditing(false);
      setEditingUser(null);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred.");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setSuccessMessage("User deleted successfully!");
    } catch (error) {
      setErrorMessage("Error deleting user.");
    }
  };

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

      {/* Success Modal */}
      {successMessage && (
        <SuccessModal
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}

      {/* Error Modal */}
      {errorMessage && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </div>
  );
}
