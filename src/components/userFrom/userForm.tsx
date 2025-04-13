import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { postItemsServ } from "../../services";
import { EndorsementResponseType, NotificationType } from "../../types";

import "./userForm.css";
import { ROUTES } from "../../constants/routes";

type UserFormProps = {
  endorsementId: string;
  showNotification: (
    message: string,
    type?: NotificationType,
    visible?: boolean
  ) => void;
};

const MAX_CHAR = 500;

const UserForm = ({ endorsementId, showNotification }: UserFormProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const isOverLimit = message.length > MAX_CHAR;

  const postMessage = async (): Promise<EndorsementResponseType> => {
    const newMessage = message.trim();
    if (!newMessage || isOverLimit)
      return {
        success: false,
        message: "Message is empty or over the limit",
        data: [],
      };

    const fullUrl = `${
      import.meta.env.VITE_SUPABASE_BASE_URL
    }update-endorsement/${endorsementId}`;

    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_STATIC_TOKEN}`,
    };

    const body = {
      content: newMessage,
    };

    return await postItemsServ<EndorsementResponseType>(fullUrl, body, headers);
  };

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: postMessage,
    onSuccess: (data: EndorsementResponseType) => {
      if (!!data && "success" in data) {
        showNotification("sent successfully!", "success", true);
        navigate(ROUTES.SUCCESS);
      }
      if (!!data && "error" in data) {
        showNotification("Failed to sent", "error", true);
        setTimeout(() => {
          navigate(ROUTES.NOT_FOUND);
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
            border: `2px solid ${isOverLimit ? "#e74c3c" : "#B0B3B4"}`,
            backgroundColor: "transparent",
            padding: "16px",
            color: "white",
            outline: "none",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          placeholder="Write your message here..."
          onFocus={(e) =>
            (e.target.style.borderColor = isOverLimit ? "#e74c3c" : "#7f8c8d")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = isOverLimit ? "#e74c3c" : "#B0B3B4")
          }
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: isOverLimit ? "#e74c3c" : "#aaa",
          }}
        >
          <span>
            {message.length} / {MAX_CHAR} characters
          </span>
          {isOverLimit && <span>Maximum character limit exceeded</span>}
        </div>

        <button
          onClick={() => !isOverLimit && !!message.trim() && sendMessage()}
          disabled={isPending || !message.trim() || isOverLimit}
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
            cursor:
              isPending || !message.trim() || isOverLimit
                ? "not-allowed"
                : "pointer",
            opacity: isPending || !message.trim() || isOverLimit ? "0.6" : "1",
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
