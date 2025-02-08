"use client"; // to make compiler understand that this is client-side file
import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { Button, CircularProgress, Pagination } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { API_URL, addUser, editUser, deleteUser } from "@/app/utils/api";
import AddEditModal from "@/app/components/AddEditModal";
import UserTable from "@/app/components/UserTable";
import SuccessModal from "@/app/components/SuccessModal";
import ErrorModal from "@/app/components/ErrorModal";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Page() {
// load and destruct data in data and fetchedUsers repectively using SWR(State-While-Revalidate) a react based function to cache api data optimally.
  const { data: fetchedUsers, error } = useSWR(API_URL, fetcher);

  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0); // ID counter when adding users
  const [form, setForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    company: { name: "" },
  });
   // modals for sucess and error
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Sync fetched data with users state
  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers);
      const maxId = fetchedUsers.reduce(
        (max, user) => Math.max(max, user.id),
        0
      );
      setCount(maxId + 1); // Update ID counter dynamically
    }
  }, [fetchedUsers]);

  // Reset form fields
  const resetForm = () => {
    setForm({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      company: { name: "" },
    });
    setEditing(false);
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      ...(name === "department"
        ? { company: { ...prevForm.company, name: value } }
        : { [name]: value }),
    }));
  };

  // Submit form to add or edit user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.company.name
    ) {
      alert("All fields are required");
      return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ0-9]{2,6}$/;
    if (!emailPattern.test(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Validate name pattern (only letters and spaces)
    const namePattern = /^[a-zA-Z\s]+$/;
    if (
      !namePattern.test(form.firstName) ||
      (form.lastName && !namePattern.test(form.lastName))
    ) {
      alert("First name and last name should contain only letters and spaces.");
      return;
    }

    try {
      const editUserData = {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        company: { name: form.company.name },
      };

      if (editing) {
        let response;

        // Handle user edit
        if (form.id > 10) {
          response = editUserData; // No API call for locally added users as it won't reflect in the api.
        } else {
          response = await editUser(form.id, editUserData); // API call to edit user
        }

        const updatedUsers = users.map((user) =>
          user.id === form.id ? { ...user, ...editUserData } : user
        );
        setUsers(updatedUsers);
        setSuccessMessage("Edited Successfully");
      } else {
        const newUser = {
          id: count,
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          company: { name: form.company.name },
        };
        const response = await addUser(newUser); // API call to add new user

        setUsers((prevUsers) => [...prevUsers, newUser]);
        setCount(count + 1);
        setSuccessMessage("Added Successfully");
      }

      setSuccessOpen(true);
      resetForm();
      setOpenModal(false);
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while processing the request"
      );
      setErrorOpen(true);
    }
  };

  // Handle user edit
  const handleEdit = (user) => {
    const nameParts = user.name.split(" ");  // Eg John Smith
    setForm({
      id: user.id,
      firstName: nameParts[0],
      lastName: nameParts[1],
      email: user.email,
      company: { name: user.company.name },
    });
    setEditing(true);
    setOpenModal(true);
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        setErrorMessage(error.message || "Error deleting user");
        setErrorOpen(true);
      }
    }
  };

  const handleCloseModal = () => {
    resetForm();
    setOpenModal(false);
  };

  if (error)
    return <p className="text-red-500 text-center">Failed to load users</p>;
  if (!users)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CircularProgress />
        <h6>Loading. Hang tight...</h6>
      </div>
    );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">
        User Management Dashboard
      </h1>
      <div className="flex flex-col items-end mb-4">
        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "none",
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
            padding: "0.5em 1em",
            width: "auto",
          }}
        >
          Add User <AddCircle />
        </Button>
      </div>
{/* 5 x 5 data table with pagination to navigate to next 5 records */}
      <UserTable
        users={currentUsers}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <div className="flex justify-center m-4">
        <Pagination
          count={Math.ceil(users.length / usersPerPage)}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
        />
      </div>
{/* Triggered through Add User button or edit icon corresponding to any table row.*/}
      <AddEditModal
        open={openModal}
        onClose={handleCloseModal}
        form={form}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        editing={editing}
      />
      <SuccessModal
        open={successOpen}
        setOpen={setSuccessOpen}
        message={successMessage}
      />
      <ErrorModal
        open={errorOpen}
        setOpen={setErrorOpen}
        errorMessage={errorMessage}
      />
    </div>
  );
}

// Assumptions
/*1.The API functions addUser, editUser, and deleteUser are properly defined and handle the respective API calls.
2.The UserTable, AddEditModal, SuccessModal, and ErrorModal components are correctly implemented to handle the display and interactions.
3.Pagination is handled via currentPage and usersPerPage, and data is sliced accordingly.
4.users is the primary state for holding the user data, and count is used to generate unique IDs for new users. */
