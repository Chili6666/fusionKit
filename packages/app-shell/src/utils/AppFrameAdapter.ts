import type {
  FrameAdapter,
  MessageBoxMessage,
  NotificationTypes,
  ToastTypes,
} from "fusion-kit-contracts";

export class AppFrameAdapter implements FrameAdapter {
  public showNotification(
    message: string | undefined,
    notificationType: NotificationTypes
  ): void {
    console.log(`Notification: ${message} ${notificationType}`);
  }

  public showNotifications(
    notifications: {
      message: string | undefined;
      notificationType: NotificationTypes;
    }[]
  ): void {
    notifications.forEach((notification) => {
      this.showNotification(
        notification.message,
        notification.notificationType
      );
    });
  }

  public showMessageBox(
    title: string,
    messages: MessageBoxMessage[],
    cancelButtonText: string,
    confirmButtonText: string,
    confirmCallback?: () => void,
    cancelCallback?: () => void
  ): void {
    console.log(`MessageBox: ${title}  ${messages} ${cancelButtonText} ${confirmButtonText} ${confirmCallback} ${cancelCallback}`);
  }

  public showToast(message: string, toastType: ToastTypes): void {
    console.log(`Toast: ${message} ${toastType}`);
  }
}
