import React, { useState } from "react";
import ChatBot from "./components/ChatBot";
import "./Login.css";
import logo from "./images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./components/AxiosInstance.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Adminlogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username) {
      toast.error("Please fill in your username.");
      return;
    }

    if (!password) {
      toast.error("Please fill in your password.");
      return;
    }

    try {
      const response = await axiosInstance.post("/admin/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { token, admin } = response.data; // Extract token and admin details
        // Store token and admin data in localStorage
        localStorage.setItem("adminToken", token);
        // Redirect to admin dashboard
        navigate("/CityPulse/adminDashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div style={{ height: "100vh" }}>
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
            <label className="input_label" htmlFor="username_field">
              Username
            </label>
            <div className="inputsss">
              <FontAwesomeIcon icon={faUser} className="login-icons" />
              <input
                placeholder="username"
                title="Input title"
                type="username"
                className="input_field"
                id="username_field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
          </p>
          <Link className="note" to="/CityPulse/terms&conditions">
            Terms of use &amp; Conditions
          </Link>
        </form>
      </div>
      <ChatBot />
    </div>
  );
}
