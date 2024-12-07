import React, { useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance";
import "./ForumDisplay.css";

function ForumDisplay() {
  const [forums, setForums] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch forums on load
  useEffect(() => {
    fetchForums();
  }, []);

  // Fetch forums from the backend
  const fetchForums = async () => {
    try {
      const response = await axiosInstance.get("/forums");
      const sortedForums = response.data.sort(
        (a, b) =>
          new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time)
      );
      setForums(sortedForums);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching forums", error);
      setLoading(false);
    }
  };

  // Handle like functionality
  const handleLike = async (id) => {
    try {
      await axiosInstance.post(`/forums/${id}/like`);
      fetchForums(); // Refresh forums after like
    } catch (error) {
      console.error("Error liking the forum", error);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (id) => {
    if (!newComment[id]) return;

    try {
      await axiosInstance.post(`/forums/${id}/comment`, {
        comment: newComment[id],
      });
      setNewComment({ ...newComment, [id]: "" });
      fetchForums(); // Refresh forums after commenting
    } catch (error) {
      console.error("Error submitting the comment", error);
    }
  };

  return (
    <div className="forum-display-container">
      <h2>Community Forums</h2>

      {loading ? (
        <p>Loading forums...</p>
      ) : forums.length === 0 ? (
        <p>No forums available. Be the first to post!</p>
      ) : (
        forums.map((forum) => (
          <div key={forum.id} className="forum-card">
            <h3>{forum.issue}</h3>
            <p className="forum-msg">{forum.msg}</p>
            <p className="forum-meta">
              Posted by <strong>{forum.user.username}</strong> on{" "}
              {new Date(forum.date).toLocaleDateString()} at{" "}
              {new Date("1970-01-01T" + forum.time).toLocaleTimeString()}
            </p>

            <div className="forum-actions">
              <button className="like-btn" onClick={() => handleLike(forum.id)}>
                👍 Like ({forum.likes || 0})
              </button>
            </div>

            <div className="comment-section">
              <h4>Comments</h4>
              {forum.comments && forum.comments.length > 0 ? (
                forum.comments.map((comment, index) => (
                  <p key={index} className="comment">
                    <strong>{comment.user}</strong>: {comment.comment}
                  </p>
                ))
              ) : (
                <p className="no-comments">No comments yet.</p>
              )}

              <textarea
                placeholder="Add a comment..."
                className="comment-input"
                value={newComment[forum.id] || ""}
                onChange={(e) =>
                  setNewComment({ ...newComment, [forum.id]: e.target.value })
                }
              />
              <button
                className="comment-btn"
                onClick={() => handleCommentSubmit(forum.id)}
              >
                Post Comment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ForumDisplay;
