import React, { useState } from "react";
import "./ForgotPassword.css";
import Toast from "./components/Toast";
import axiosInstance from "./components/AxiosInstance";

export default function PasswordUpdate() {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve email from localStorage
    const email = localStorage.getItem("temp_forgot_mail");

    if (!email) {
      setToastMessage({
        message: "No email found for password reset.",
        type: "error",
      });
      return;
    }

    // Validate passwords
    if (password !== retypePassword) {
      setToastMessage({
        message: "Passwords do not match!",
        type: "error",
      });
      return;
    }

    try {
      // Send POST request to update password
      const response = await axiosInstance.post("/users/updatePassword", {
        email,
        password,
      });

      setToastMessage({
        message: response.data.message || "Password updated successfully!",
        type: "success",
      });

      // Optionally clear local storage
      localStorage.removeItem("temp_forgot_mail");
    } catch (error) {
      console.error("Error updating password:", error);
      setToastMessage({
        message:
          error.response?.data?.message ||
          "Failed to update password. Try again.",
        type: "error",
      });
    }
  };

  return (
    <div>
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          color={toastMessage.type === "error" ? "red" : "green"}
          onClose={() => setToastMessage(null)}
        />
      )}
      <div className="form-container">
        <div className="logo-container">Update Password</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="retypePassword">Re-type Password</label>
            <input
              type="password"
              id="retypePassword"
              name="retypePassword"
              placeholder="Re-enter your password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
            />
          </div>
          <button className="form-submit-btn" type="submit">
            Confirm
          </button>
        </form>
        <p>You will get a confirmation mail once updated!</p>
      </div>
    </div>
  );
}
