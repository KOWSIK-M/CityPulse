import React, { useState } from "react";
import axiosInstance from "./AxiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import "./Topics.css";

function ForumForm({ topic, handleBack }) {
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!msg.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      let userEmail = "";

      if (token) {
        const decodedToken = jwtDecode(token);
        userEmail = decodedToken.sub; // Assuming the email is stored in the 'sub' field
      }

      const response = await axiosInstance.post("/forums/add", {
        issue: topic,
        msg,
        femail: userEmail, // Include the email in the request body
      });

      if (response.status === 200) {
        toast.success("Forum post submitted successfully!");
      }
    } catch (error) {
      toast.error("Failed to submit the post.");
    }
  };

  return (
    <div className="forum-form">
      <ToastContainer />
      <button className="back-button" onClick={handleBack}>
        ← Back
      </button>
      <h2>Submit Forum for {topic}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={`Describe the ${topic.toLowerCase()}...`}
          rows="5"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default function Topics() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    "Road Issues",
    "Water Problems",
    "Electricity Failure",
    "Public Transport",
    "Health & Sanitation",
  ];

  return (
    <div className="topics-container">
      {selectedTopic ? (
        <ForumForm
          topic={selectedTopic}
          handleBack={() => setSelectedTopic(null)}
        />
      ) : (
        <>
          <h2>Select a Topic</h2>
          <ul className="topics-list">
            {topics.map((topic, index) => (
              <li
                key={index}
                className="topic-item"
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
