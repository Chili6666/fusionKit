import type {
  FrameAdapter,
  MessageBoxMessage,
  NotificationTypes,
  ToastTypes,
} from "fusion-kit-contracts";

interface ShellMethods {
  handleShowToast: (message: string, type: ToastTypes) => void;
  handleShowNotification: (message: string | undefined, type: NotificationTypes) => void;
  handleShowMessageBox: (title: string, messages: MessageBoxMessage[]) => void;
}

export class AppFrameAdapter implements FrameAdapter {
  private _shell: ShellMethods;

  constructor(shell: ShellMethods) {
    this._shell = shell;
  }

  public showNotification(
    message: string | undefined,
    notificationType: NotificationTypes
  ): void {
    if (!this._shell) return;
    if (typeof this._shell.handleShowNotification === 'function') {
      console.log('showNotification', message, notificationType);
      this._shell.handleShowNotification(message, notificationType);
    } else {
      console.error('handleShowNotification method not found on shell');
    }
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
    _cancelButtonText?: string,
    _confirmButtonText?: string,
    _confirmCallback?: () => void,
    _cancelCallback?: () => void
  ): void {
    if (!this._shell) return;
    if (typeof this._shell.handleShowMessageBox === 'function') {
      this._shell.handleShowMessageBox(title, messages);
    } else {
      console.error('handleShowMessageBox method not found on shell');
    }
  }

  public showToast(message: string, toastType: ToastTypes): void {
    if (!this._shell) return;

    if (typeof this._shell.handleShowToast === 'function') {
      this._shell.handleShowToast(message, toastType);
    } else {
      console.error('handleShowToast method not found on shell');
    }
  }
}