import React, { useEffect, useState } from "react";
import axiosInstance from "./AxiosInstance"; // Import custom Axios instance
import "./AllFeedbacks.css"; // Custom CSS for styling

export default function AllFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all feedbacks
    axiosInstance
      .get("/admin/allfeedbacks")
      .then((response) => {
        setFeedbacks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching feedbacks:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="feedbacks-loading">Loading feedbacks...</div>;
  }

  return (
    <div className="feedbacks-feedbacks-container">
      <h1>All Feedbacks</h1>
      <div className="feedbacks-feedbacks-grid">
        {feedbacks.map((feedback) => (
          <div className="feedbacks-feedback-card" key={feedback.id}>
            <div className="feedbacks-user-info">
              <img
                src={
                  feedback.user.photoUrl || "https://via.placeholder.com/150"
                }
                alt={`${feedback.user.username}'s profile`}
                className="feedbacks-user-image"
              />
              <div className="feedbacks-user-details">
                <h2>{feedback.user.username}</h2>
                <p>
                  <strong>Email:</strong> {feedback.user.email}
                </p>
              </div>
            </div>
            <div className="feedbacks-feedback-details">
              <p>
                <strong>Location:</strong> {feedback.location}
              </p>
              <p>
                <strong>City:</strong> {feedback.city}
              </p>
              <p>
                <strong>Feedback:</strong> {feedback.feedback}
              </p>
              <p>
                <strong>Rating:</strong> {feedback.rating}
              </p>
              <p>
                <strong>Approved:</strong> {feedback.approved ? "Yes" : "No"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
