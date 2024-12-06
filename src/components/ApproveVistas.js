import React, { useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance"; // Use the configured Axios instance
import "./ApproveVistas.css";

const ApproveVistas = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch unapproved feedbacks on component mount
    axiosInstance
      .get("/admin/unapproved") // Adjusted endpoint
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching unapproved feedbacks!",
          error
        );
      });
  }, []);

  const approveFeedback = (feedbackId) => {
    axiosInstance
      .put(`/admin/approve/${feedbackId}`)
      .then((response) => {
        console.log(response.data);
        // Optionally refetch the feedback list or update state
      })
      .catch((error) => {
        console.error("Error approving feedback:", error);
      });
  };

  return (
    <div>
      <h2>Unapproved Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p>No unapproved feedbacks available.</p>
      ) : (
        feedbacks.map((feedback) => (
          <div key={feedback.id} className="card-dashboard">
            <div className="feedback-header">
              <img
                src={feedback.user.photoUrl}
                alt="User"
                className="feedback-avatar"
              />
              <div>
                <h3>{feedback.user.username}</h3>
                <p>{feedback.user.email}</p>
              </div>
            </div>
            <div className="feedback-details">
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
            </div>
            <div key={feedback.id}>
              {/* Other feedback details */}
              <button
                className="approve-button"
                onClick={() => approveFeedback(feedback.id)}
              >
                Approve
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ApproveVistas;
