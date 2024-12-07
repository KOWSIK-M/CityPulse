import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "./AxiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ForumForms.css";

export default function ForumForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const issue = location.state?.issue || "General Issue";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!msg.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    try {
      const response = await axiosInstance.post("/forums/add", {
        issue,
        msg,
      });

      if (response.status === 200) {
        toast.success("Forum post submitted successfully!");
        navigate("/CityPulse/forums");
      }
    } catch (error) {
      toast.error("Failed to submit the post.");
    }
  };

  return (
    <div className="forum-form-container">
      <ToastContainer />
      <h2>Submit Your Issue</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Issue</label>
          <input type="text" value={issue} readOnly className="form-input" />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            className="form-input"
            placeholder="Describe the issue in detail..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
