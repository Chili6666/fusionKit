export type NotificationTypes = "info" | "warning" | "error" | "success";
export type MessageBoxTypes = "info" | "warning" | "error" | "success";
export type ToastTypes = "info" | "warning" | "error" | "success";

export interface MessageBoxMessage {
  type?: MessageBoxTypes;
  message?: string;
}
