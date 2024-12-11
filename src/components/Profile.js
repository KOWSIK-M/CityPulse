import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    dob: "",
    city: "",
    contact: "",
    profileImage: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("/api/user/profile")
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("dob", user.dob);
    formData.append("city", user.city);
    formData.append("contact", user.contact);
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }

    axios
      .post("/api/user/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => alert("Profile updated successfully!"))
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleInputChange}
          required
        />

        <label>Email:</label>
        <input type="email" name="email" value={user.email} disabled />

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={user.dob}
          onChange={handleInputChange}
          required
        />

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={user.city}
          onChange={handleInputChange}
          required
        />

        <label>Contact:</label>
        <input
          type="tel"
          name="contact"
          value={user.contact}
          onChange={handleInputChange}
          required
        />

        <label>Profile Image:</label>
        <input type="file" onChange={handleFileChange} accept="image/*" />

        {user.profileImage && (
          <img
            src={user.profileImage}
            alt="Profile"
            className="profile-image"
          />
        )}

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
