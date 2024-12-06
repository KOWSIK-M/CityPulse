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

export default function Userlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please fill in your email.");
      return;
    }

    if (!password) {
      toast.error("Please fill in your password.");
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
            <p className="title">User Login</p>
            <span className="subtitle">
              Get started with our app, just create an account and enjoy the
              experience.
            </span>
          </div>
          <div className="input_container">
            <label className="input_label" htmlFor="email_field">
              Email
            </label>
            <div className="inputsss">
              <FontAwesomeIcon icon={faUser} className="login-icons" />
              <input
                placeholder="name@mail.com"
                title="Input title"
                type="email"
                className="input_field"
                id="email_field"
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
          <p>
            New User? <Link to="/CityPulse/signup">SignUp</Link>
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
