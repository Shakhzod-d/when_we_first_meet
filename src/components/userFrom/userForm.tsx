import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { postItemsServ } from "../../services";
import { NotificationType } from "../../types";

import "./userForm.css";
import { useNavigate } from "react-router-dom";

type UserFormProps = {
  endorsementId: string;
  showNotification: (
    message: string,
    type?: NotificationType,
    visible?: boolean
  ) => void;
};

const UserForm = ({ endorsementId, showNotification }: UserFormProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const postMessage = async () => {
    const newMessage = message.trim();
    if (!newMessage) return;

    const fullUrl = `${
      import.meta.env.VITE_SUPABASE_BASE_URL
    }update-endorsement/${endorsementId}`;

    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_STATIC_TOKEN}`,
    };

    const body = {
      content: newMessage,
    };

    return postItemsServ(fullUrl, body, headers);
  };

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: postMessage,
    onSuccess: (data: any) => {
      if (!!data && "success" in data) {
        showNotification("sent successfully!", "success", true);
      }
      if (!!data && "error" in data) {
        showNotification("Failed to sent", "error", true);
        setTimeout(() => {
          navigate("/404");
        }, 3000);
      }
      setMessage("");
    },
    onError: () =>
      showNotification("Failed to send. Please try again.", "error", true),
  });

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#111111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "343px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100% !important",
            height: "131px",
            resize: "none",
            borderRadius: "8px",
            border: "2px solid #B0B3B4",
            backgroundColor: "transparent",
            padding: "16px",
            color: "white",
            outline: "none",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          placeholder="Write your message here..."
          onFocus={(e) => (e.target.style.borderColor = "#7f8c8d")}
          onBlur={(e) => (e.target.style.borderColor = "#B0B3B4")}
        />

        <button
          onClick={() => !!message.trim() && sendMessage()}
          disabled={isPending || !message.trim()}
          style={{
            width: "100% !important",
            height: "48px",
            borderRadius: "4px",
            backgroundColor: "#B0B3B4",
            color: "black",
            padding: "13px 16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: isPending || !message.trim() ? "not-allowed" : "pointer",
            opacity: isPending || !message.trim() ? "0.6" : "1",
          }}
        >
          {isPending ? "Sending..." : "Submit"}
          {isPending && <div className="btn_spinner"></div>}
        </button>
      </div>
    </div>
  );
};

export default UserForm;
