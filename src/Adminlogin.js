import React, { useState } from "react";
import ChatBot from "./components/ChatBot";
import "./Login.css";
import logo from "./images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./components/AxiosInstance.js";
import Toast from "./components/Toast.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Adminlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setToastMessage({
        message: "Please fill in your email.",
        type: "error", // Use error type for missing fields
        color: "red",
      });
      return;
    }

    if (!password) {
      setToastMessage({
        message: "Please fill in your password.",
        type: "error",
        color: "red",
      });
      return;
    }

    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data; // Extract token and user details
        // Store token and user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));
        // Redirect to user dashboard
        navigate("/CityPulse/userDashboard");
      }
    } catch (error) {
      setToastMessage({
        message: "Login failed. Please check your credentials.",
        type: "error",
        color: "red",
      });
    }
  };
  return (
    <div>
      <div style={{ height: "100vh" }}>
        {toastMessage && (
          <Toast
            message={toastMessage.message}
            type={toastMessage.type}
            color={toastMessage.color}
            onClose={() => setToastMessage(null)}
          />
        )}
        <form className="form_container" onSubmit={handleSubmit}>
          <div className="logo_container">
            <img
              src={logo}
              alt="logo"
              height={80}
              width={80}
              style={{ borderRadius: "25%" }}
            />
          </div>
          <div className="title_container">
            <p className="title">Admin Login</p>
            <span className="subtitle">
              Exclusively for only our partners & our admins
            </span>
          </div>
          <div className="input_container">
            <label className="input_label" htmlFor="email_field">
              Email
            </label>
            <div className="inputsss">
              <FontAwesomeIcon icon={faUser} className="login-icons" />
              <input
                placeholder="username"
                title="Input title"
                type="text"
                className="input_field"
                id="user_field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="input_container">
            <label className="input_label" htmlFor="password_field">
              Password
            </label>
            <div className="inputsss">
              <FontAwesomeIcon icon={faLock} className="login-icons" />
              <input
                placeholder="Password"
                title="Input title"
                type="password"
                className="input_field"
                id="password_field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="sign-in_btn">
            <span>Sign In</span>
          </button>
          <div className="separator">
            <hr className="line" />
            <p>Or</p>
            <hr className="line" />
          </div>
          <p>
            <Link to="/CityPulse/ForgotPassword">Forgot Password?</Link>
          </p>{" "}
          <Link className="note" to="/CityPulse/terms&conditions">
            Terms of use &amp; Conditions
          </Link>
        </form>
      </div>
      <ChatBot />
    </div>
  );
}
