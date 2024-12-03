import React, { useState } from "react";
import "./Login.css";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./AxiosInstance.js";
import Toast from "./Toast";

export default function Login(props) {
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
          <p className="title">{props.typeofUser} Login</p>
          <span className="subtitle">
            Get started with our app, just create an account and enjoy the
            experience.
          </span>
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="email_field">
            Email
          </label>
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
        <div className="input_container">
          <label className="input_label" htmlFor="password_field">
            Password
          </label>
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
  );
}
