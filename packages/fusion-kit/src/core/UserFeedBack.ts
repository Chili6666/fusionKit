import {
  FrameAdapter,
  MessageBoxMessage,
  NotificationTypes,
  ToastTypes,
} from "fusion-kit-contracts";

/**
 * Service for handling user feedback such as notifications and messages.
 */
export class UserFeedback {
  private frameAdapter: FrameAdapter | undefined;

  /**
   * Registers a frame adapter for displaying notifications.
   * @param frameAdapter - The frame adapter to register.
   */
  public registerFrameAdapter = (frameAdapter: FrameAdapter) => {
    this.frameAdapter = frameAdapter;
  };

  /**
   * Displays a notification.
   * @param message - The message to display.
   * @param notificationType - The type of notification.
   */
  public showNotification = (
    message: string | undefined,
    notificationType: NotificationTypes
  ) => {
    if (!message || !notificationType || !this.frameAdapter) return;
    this.frameAdapter.showNotification(message, notificationType);
  };

  /**
   * Displays multiple notifications.
   * @param notifications - An array of notifications to display.
   */
  public showNotifications = (
    notifications: {
      message: string | undefined;
      notificationType: NotificationTypes;
    }[]
  ): void => {
    if (!notifications || notifications.length === 0) return;
    notifications.forEach((notification) => {
      this.showNotification(
        notification.message,
        notification.notificationType
      );
    });
  };

  public showMessageBox = (
    title: string,
    messages: MessageBoxMessage[],
    cancelButtonText: string,
    confirmButtonText: string,
    confirmCallback?: () => void,
    cancelCallback?: () => void
  ): void => {
    if (!this.frameAdapter) return;
    this.frameAdapter.showMessageBox(
      title,
      messages,
      cancelButtonText,
      confirmButtonText,
      confirmCallback,
      cancelCallback
    );
  };

  public showToast = (
    message: string,
    toastType: ToastTypes = "success"
  ): void => {

    console.log('showToast', message, toastType);

    if (!message || !toastType || !this.frameAdapter) return;
    this.frameAdapter.showToast(message, toastType);
  };
}
