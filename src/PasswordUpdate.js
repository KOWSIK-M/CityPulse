import React, { useState } from "react";
import "./ForgotPassword.css";
import Toast from "./components/Toast";
import axiosInstance from "./components/AxiosInstance";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

export default function PasswordUpdate() {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("temp_forgot_mail");

    if (!email) {
      setToastMessage({
        message: "No email found for password reset.",
        type: "error",
      });
      return;
    }

    if (password !== retypePassword) {
      setToastMessage({
        message: "Passwords do not match!",
        type: "error",
      });
      return;
    }

    try {
      const response = await axiosInstance.post("/users/updatePassword", {
        email,
        password,
      });

      // On successful password update
      setToastMessage({
        message: response.data.message || "Password updated successfully!",
        type: "success",
      });

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
        navigate("/CityPulse/userlogin");
      }, 2000);
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
