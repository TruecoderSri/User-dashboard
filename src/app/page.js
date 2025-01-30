"use client";
import { useState, useEffect } from "react";
import UserForm from "@/app/components/UserForm";
import UserTable from "@/app/components/UserTable";
import { API_URL } from "@/app/utils/api";

export default function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">
        User Dashboard
      </h1>
      <UserForm setUsers={setUsers} />
      <UserTable users={users} />
    </div>
  );
}
