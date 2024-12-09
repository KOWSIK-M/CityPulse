import React, { useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance";
import { toast } from "react-toastify";
import "./Hub.css";

function Hub() {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await axiosInstance.get("/forums/all");
        setForums(response.data);
      } catch (error) {
        toast.error("Failed to load forums.");
      }
    };
    fetchForums();
  }, []);

  const handleLike = async (id) => {
    try {
      await axiosInstance.put(
        `/forums/like/${id}`,
        { like: true }, // Ensure payload is a JSON object
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setForums((prev) =>
        prev.map((forum) =>
          forum.id === id ? { ...forum, likes: forum.likes + 1 } : forum
        )
      );
      toast.success("Post liked successfully!");
    } catch (error) {
      toast.error("Failed to like the post.");
    }
  };

  return (
    <div className="hub-container">
      <h2>Community Forums</h2>
      {forums.length === 0 ? (
        <p>No posts available yet.</p>
      ) : (
        forums.map((forum) => (
          <div
            key={forum.id}
            className="card-dashboard"
            style={{ marginBottom: "8px" }}
          >
            <h2>{forum.username}</h2>
            <h3>{forum.issue}</h3>
            <p>
              <strong>{forum.user.username}</strong> : {forum.msg}
            </p>
            <div className="forum-actions">
              <button onClick={() => handleLike(forum.id)}>
                👍 Like {forum.likes}
              </button>
              <button>💬 Comment</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Hub;
