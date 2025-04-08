export type NotificationType = "success" | "error" | "info";

export type NotificationStateType = {
  message: string;
  type: NotificationType;
  visible: boolean;
};
