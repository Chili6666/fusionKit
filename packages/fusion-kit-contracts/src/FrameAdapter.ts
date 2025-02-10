import {
  MessageBoxMessage,
  NotificationTypes,
  ToastTypes,
} from "./TypeDefinitions";

export interface FrameAdapter {
  showNotification(
    message: string | undefined,
    notificationType: NotificationTypes
  ): void;

  showNotifications(
    notifications: {
      message: string | undefined;
      notificationType: NotificationTypes;
    }[]
  ): void;

  showMessageBox(
    title: string,
    messages: MessageBoxMessage[],
    cancelButtonText: string,
    confirmButtonText: string,
    confirmCallback?: () => void,
    cancelCallback?: () => void
  ): void;

  showToast(message: string, toastType: ToastTypes): void;
}
