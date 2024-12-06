import React, { useEffect, useState } from "react";
import axiosInstance from "./AxiosInstance"; // Import the custom Axios instance
import "./AllUsers.css"; // Custom CSS for styling

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users from the backend using the Axios instance
    axiosInstance
      .get("/admin/allusers") // Use relative URL as base URL is already set in axiosInstance
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="users-loading">Loading users...</div>;
  }

  return (
    <div className="users-users-container">
      <h1>All Users</h1>
      <div className="users-users-grid">
        {users.map((user) => (
          <div className="users-user-card" key={user.id}>
            <img
              src={user.photoUrl || "https://via.placeholder.com/150"}
              alt={`${user.username}'s profile`}
              className="users-user-image"
            />
            <div className="users-user-details">
              <h2>{user.username}</h2>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>City:</strong> {user.city}
              </p>
              <p>
                <strong>Contact:</strong> {user.contact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
