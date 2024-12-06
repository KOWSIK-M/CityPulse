import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required.");
      return;
    }

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
          localStorage.setItem("temp_forgot_mail", email);
          setEmail("");
          toast.success("Password reset email sent!");
        },
        (error) => {
          console.error("EmailJS Error:", error);
          toast.error("Error sending email. Please try again.");
        }
      );
  };

  return (
    <div>
      {/* Toast container for displaying toast messages */}
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
