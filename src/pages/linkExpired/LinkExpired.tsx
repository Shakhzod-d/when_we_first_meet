import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./LinkExpired.css";

const LinkExpired = () => {
  const location = useLocation();
  const { backgroundColor } = location.state || {};
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => setFadeIn(true), []);

  return (
    <div
      style={{
        background: backgroundColor || "#D9534F",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 20px",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        opacity: fadeIn ? 1 : 0,
        transition: "opacity 1s ease-in-out",
      }}
    >
      <div
        style={{
          fontSize: "4rem",
          marginBottom: "20px",
          lineHeight: 1,
          animation: "scaleUp 1s ease-in-out",
        }}
      >
        ⚠️
      </div>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "10px",
          animation: "fadeIn 1.5s ease-in-out",
        }}
      >
        Link Expired
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          maxWidth: "500px",
          opacity: fadeIn ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      >
        This link is no longer valid. It may have already been used or may have
        expired. Please reach out to the person who shared this link with you
        for further assistance.
      </p>
    </div>
  );
};

export default LinkExpired;
