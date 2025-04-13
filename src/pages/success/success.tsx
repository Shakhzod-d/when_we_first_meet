import { useState, useEffect } from "react";

import "./success.css";

const SuccessPage = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => setFadeIn(true), []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#9ec19b",
        color: "#fff",
        transition: "opacity 1s ease-in-out",
        opacity: fadeIn ? 1 : 0,
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
          animation: "fadeIn 1.5s ease-in-out",
        }}
      >
        Successfully Done
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "20px",
          animation: "fadeIn 1.5s ease-in-out",
        }}
      >
        Your action was successful! You can now proceed further.
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "#fff", marginBottom: "20px" }}
      >
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </div>
  );
};

export default SuccessPage;
