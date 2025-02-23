import { MessageBoxMessage, NotificationTypes, ToastTypes } from '.';


/**
 * Interface for handling user feedback such as notifications and messages.
 */
export interface UserFeedbackService {
      /**
   * Displays a notification.
   * @param message - The message to display.
   * @param notificationType - The type of notification.
   */
  showNotification(message: string | undefined, notificationType: NotificationTypes): void;

    /**
   * Displays multiple notifications.
   * @param notifications - An array of notifications to display.
   */
  showNotifications(notifications: { message: string | undefined; notificationType: NotificationTypes }[]): void;

  /**
   * Displays a message box with multiple messages.
   * @param title - The title of the message box.
   * @param messages - An array of messages to display in the message box.
   * @param cancelButtonText - The text for the cancel button.
   * @param confirmButtonText - The text for the confirm button.
   * @param confirmCallback - Optional callback function to be called when the confirm button is clicked.
   * @param cancelCallback - Optional callback function to be called when the cancel button is clicked.
   */
  showMessageBox(
    title: string,
    messages: MessageBoxMessage[],
    cancelButtonText: string,
    confirmButtonText: string,
    confirmCallback?: () => void,
    cancelCallback?: () => void
  ): void;

  /**
   * Displays a toast message.
   * @param message - The message to display.
   * @param toastType - The type of toast message.
   */
  showToast(message: string, toastType: ToastTypes): void;
}