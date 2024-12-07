import React, { useState } from "react";
import "./ForgotPassword.css";
import axiosInstance from "./components/AxiosInstance";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PasswordUpdate() {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("temp_forgot_mail");

    if (!email) {
      toast.error("No email found for password reset.");
      return;
    }

    if (password !== retypePassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axiosInstance.post("/users/updatePassword", {
        email,
        password,
      });

      // On successful password update
      toast.success(response.data.message || "Password updated successfully!");

      // Send confirmation email
      emailjs
        .send(
          "service_siyox4g",
          "template_0mh8adt",
          {
            to_email: email,
            subject: "Password Update Confirmation",
            message: "Your password has been successfully updated.",
          },
          "Wl6x-mFiuqXkR-fyd"
        )
        .then(
          () => {
            console.log("Confirmation email sent successfully.");
          },
          (error) => {
            console.error("Error sending confirmation email:", error);
          }
        );

      // Remove temporary email from local storage
      localStorage.removeItem("temp_forgot_mail");

      // Redirect to login page after success
      setTimeout(() => {
        navigate("/userlogin");
      }, 2000);
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(
        error.response?.data?.message || "Failed to update password. Try again."
      );
    }
  };

  return (
    <div>
      {/* Toast container for displaying notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="form-container">
        <div className="logo-container">Update Password</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="retypePassword">Re-type Password</label>
            <input
              type="password"
              id="retypePassword"
              placeholder="Re-enter your password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form-submit-btn">
            Confirm
          </button>
        </form>
        <p>You will get a confirmation mail once updated!</p>
      </div>
    </div>
  );
}
