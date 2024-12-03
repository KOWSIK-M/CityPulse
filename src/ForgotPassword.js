import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import Toast from "./components/Toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_siyox4g",
        "template_xhlfk6g",
        {
          to_email: email,
          from_email: "2200030358cseh@gmail.com",
          subject: "Password Reset Request",
          message: "Click here to reset your password: [reset link]",
        },
        "Wl6x-mFiuqXkR-fyd"
      )
      .then(
        () => {
          // Store the email in local storage
          localStorage.setItem("temp_forgot_mail", email);
          // Clear the email input
          setEmail("");
          // Show success toast
          setToastMessage({
            message: "Password reset email sent!",
            type: "success",
          });
        },
        (error) => {
          console.error("Error:", error);
          // Show error toast
          setToastMessage({
            message: "Error sending email. Please try again.",
            type: "error",
          });
        }
      );
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
        <div className="logo-container">Forgot Password</div>
        <form className="form" onSubmit={sendEmail}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="form-submit-btn" type="submit">
            Send Email
          </button>
        </form>
        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/CityPulse/signup" className="signup-link link">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
