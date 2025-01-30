import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Add new user
export const addUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    throw new Error("Error adding user");
  }
};

// Edit an existing user
export const editUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
  } catch (error) {
    throw new Error("Error editing user");
  }
};

// Delete an existing user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error("Error deleting user");
  }
};
