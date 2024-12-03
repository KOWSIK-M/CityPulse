import React, { useEffect, useState } from "react";
import "./Toast.css"; // You can define your styles in this file

const Toast = ({ message, type, color, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Automatically hide the toast after 5 seconds unless manually closed
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Calls the onClose function passed from parent
    }, 5000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [onClose]);

  // Toast style based on the message type
  const toastStyles = {
    backgroundColor: color || (type === "error" ? "red" : "green"), // Default to red for error, green for success
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 1000,
    fontSize: "16px",
    display: visible ? "block" : "none",
    transition: "opacity 0.5s ease",
    display: "flex", // Flex layout to position close button
    justifyContent: "space-between", // Space between the message and close button
    alignItems: "center",
  };

  // Button style for the close button
  const closeButtonStyles = {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
  };

  const handleClose = () => {
    setVisible(false);
    onClose(); // Trigger the onClose prop when the button is clicked
  };

  return (
    <div className="toast" style={toastStyles}>
      <span>{message}</span>
      <button onClick={handleClose} style={closeButtonStyles}>
        &#x2715;
      </button>{" "}
      {/* Close button with '×' */}
    </div>
  );
};

export default Toast;
