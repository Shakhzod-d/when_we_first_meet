import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchItemsServ } from "../../services";
import { Notification, Spinner, UserForm } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import {
  EndorsementResponseType,
  NotificationStateType,
  NotificationType,
} from "../../types";
import { ROUTES } from "../../constants/routes";

const User = () => {
  const { endorsementId } = useParams();
  const navigate = useNavigate();
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

    return fetchItemsServ<EndorsementResponseType>(fullUrl, headers);
  };

  const { data, isLoading, isSuccess } = useQuery<EndorsementResponseType>({
    queryFn: getEndorsementById,
    queryKey: ["getEndorsementById", endorsementId],
    staleTime: 0,
    enabled: !!endorsementId,
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

  useEffect(() => {
    if (!isSuccess || !data) return;

    const endorsementContent = data?.data?.[0]?.content;

    if (endorsementContent !== null) {
      navigate(ROUTES.LINK_EXPIRED, { state: { backgroundColor: "#D9534F	" } });
    }
  }, [data, navigate, endorsementId, isSuccess]);

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
