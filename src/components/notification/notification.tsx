import { useEffect } from "react";
import { NotificationType } from "../../types";

type NotificationProps = {
  message: string;
  type: NotificationType;
  onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  const getNotificationStyle = () => {
    switch (type) {
      case "success":
        return { backgroundColor: "#4BB543", color: "#fff" };
      case "error":
        return { backgroundColor: "#E74C3C", color: "#fff" };
      case "info":
        return { backgroundColor: "#3498DB", color: "#fff" };
      default:
        return {};
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: getNotificationStyle().backgroundColor,
        color: getNotificationStyle().color,
        padding: "12px 24px",
        borderRadius: "8px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontSize: "16px",
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
