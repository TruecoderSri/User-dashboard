import { useEffect, useState } from "react";

export default function UserForm({ handleSubmit, isEditing, editingUser }) {
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (isEditing && editingUser) {
      setFormData(editingUser);
    } else {
      setFormData({ name: "", email: "" });
    }
  }, [isEditing, editingUser]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    setFormData({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleFormSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="border p-2 rounded w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="border p-2 rounded w-full mt-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
        {isEditing ? "Update User" : "Add User"}
      </button>
    </form>
  );
}
