import type {
  FrameAdapter,
  MessageBoxMessage,
  NotificationTypes,
  ToastTypes,
} from "fusion-kit-contracts";

export class MFEFrameAdapter implements FrameAdapter {
  public showNotification(
    _message: string | undefined,
    _notificationType: NotificationTypes
  ): void {
    throw new Error("Method not implemented.");
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
    _title: string,
    _messages: MessageBoxMessage[],
    _cancelButtonText?: string,
    _confirmButtonText?: string,
    _confirmCallback?: () => void,
    _cancelCallback?: () => void
  ): void {
    throw new Error("Method not implemented.");
  }

  public showToast(message: string, _toastType: ToastTypes): void {
    window.alert(message);
  }
}
