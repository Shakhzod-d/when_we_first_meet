import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchItemsServ } from "../../services";
import { Notification, Spinner, UserForm } from "../../components";
import { useParams } from "react-router-dom";
import {
  EndorsementErrorResponseType,
  EndorsementResponseType,
  NotificationStateType,
  NotificationType,
} from "../../types";

const User = () => {
  const { endorsementId } = useParams();
  const [notification, setNotification] = useState<NotificationStateType>({
    message: "",
    type: "info",
    visible: false,
  });

  const getEndorsementById = () => {
    const fullUrl = `${
      import.meta.env.VITE_SUPABASE_BASE_URL
    }get-endorsement/${endorsementId}`;

    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_STATIC_TOKEN}`,
    };

    return fetchItemsServ<
      EndorsementResponseType | EndorsementErrorResponseType
    >(fullUrl, headers);
  };

  const { isLoading, isSuccess } = useQuery<
    EndorsementResponseType | EndorsementErrorResponseType
  >({
    queryFn: getEndorsementById,
    queryKey: ["getEndorsementById"],
    staleTime: 0,
  });

  const showNotification = useCallback(
    (message: string, type: NotificationType = "info", visible = true) => {
      setNotification({ message, type, visible: visible });
    },
    []
  );

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  if (!endorsementId) return <p>User ID is missing. Access denied.</p>;
  if (isLoading) return <Spinner />;

  return (
    <div>
      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      {isSuccess ? (
        <UserForm
          endorsementId={endorsementId}
          showNotification={showNotification}
        />
      ) : (
        <p>Something went wrong</p>
      )}
    </div>
  );
};

export default User;
