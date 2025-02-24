export type NotificationTypes = 'info' | 'warning' | 'error' | 'success';
export type MessageBoxTypes = 'info' | 'warning' | 'error' | 'success' | 'question';
export type ToastTypes = 'info' | 'warning' | 'error';

export interface MessageBoxMessage {
  type?: MessageBoxTypes;
  message?: string;
}


export type RemoteModuleConfigurationFormat = 'esm' | 'systemjs' | 'var';
export type RemoteModuleConfigurationBundler = 'vite' | 'webpack';