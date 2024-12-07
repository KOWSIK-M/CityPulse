import React, { useState } from "react";
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faCity,
  faCalendar,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import signupImg from "../images/signup-image.jpg";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axiosInstance from "./AxiosInstance"; // Adjust path if needed
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    dob: "",
    gender: "",
    city: "",
    password: "",
    re_pass: "",
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Field validations
    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (!validatePhoneNumber(formData.contact)) {
      toast.error("Invalid phone number. Use a valid 10-digit number.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.re_pass) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Send only required data to the server
      const { re_pass, ...dataToSend } = formData;
      const response = await axiosInstance.post("/users/register", {
        ...dataToSend,
      });

      toast.success("Registration successful!");
      // Redirect to login page after successful registration
      navigate("/userlogin");
    } catch (error) {
      toast.error(error.response?.data?.success || "Registration failed!");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="main">
        <ToastContainer />
        <section className="signup">
          <div className="container-sup">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label htmlFor="name">
                      <FontAwesomeIcon icon={faUser} className="icon" />
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Your Name"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <FontAwesomeIcon icon={faEnvelope} className="icon" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact">
                      <FontAwesomeIcon icon={faPhone} className="icon" />
                      Contact No.
                    </label>
                    <input
                      type="text"
                      name="contact"
                      id="contact"
                      placeholder="Your Contact no."
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">
                      <FontAwesomeIcon icon={faCalendar} className="icon" />
                      DOB
                    </label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <div className="gender-options">
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          onChange={handleInputChange}
                          required
                        />
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          onChange={handleInputChange}
                        />
                        Female
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Other"
                          onChange={handleInputChange}
                        />
                        Other
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">
                      <FontAwesomeIcon icon={faCity} className="icon" />
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">
                      <FontAwesomeIcon icon={faLock} className="icon" />
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="re_pass">
                      <FontAwesomeIcon icon={faLock} className="icon" />
                      Re-Enter Password
                    </label>
                    <input
                      type="password"
                      name="re_pass"
                      id="re_pass"
                      placeholder="Repeat your password"
                      value={formData.re_pass}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="agree-term" className="label-agree-term">
                      <input
                        type="checkbox"
                        name="agree-term"
                        id="agree-term"
                        className="agree-term"
                        required
                      />
                      I agree to all statements in
                      <Link to="/terms&conditions">Terms of service</Link>
                    </label>
                  </div>
                  <div className="form-group form-button">
                    <button type="submit" className="form-submit">
                      Register
                    </button>
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure>
                  <img src={signupImg} alt="sign up" />
                </figure>
                <Link to="/userlogin" className="signup-image-link">
                  I am already a member
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
