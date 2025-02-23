import { UserFeedbackService } from '.';

export type RemoteModuleConfigurationFormat = 'esm' | 'systemjs' | 'var';
export type RemoteModuleConfigurationBundler = 'vite' | 'webpack';

//The `ModuleConfiguration` interface defines the structure for configuring a module that is loaded from a remote server.
//This configuration includes details such as the URL, name, module type, format, and bundler.

/**
 *
 * @param url 'http://localhost:9000/assets/remoteEntry.js'
 * @param name 'remoteA'
 * @param module './RemoteARoot'
 * @param format 'esm'
 * @param bundler 'vite'
 */
export interface RemoteModuleConfiguration {
  url: string;
  name: string;
  module: string;
  format?: RemoteModuleConfigurationFormat;
  bundler?: RemoteModuleConfigurationBundler;
}

//The `ModuleMenuItem` interface defines the structure for a menu item within a module.
//This includes properties for the item's identifier, title, execution capability, icon, execution function, and any sub-menu items.
export interface ModuleMenuItem {
  id: string;
  title: string;
  canExecute: boolean;
  icon: string;
  execute: () => void;
  menuItems: ModuleMenuItem[];
}

//The `Module` interface defines the structure for loaded a module,
//including its identifier, title, description, menu items, and methods for mounting and unmounting the module.
export interface Module {
  name: string;
  title: string;
  description: string;
  menuItems: ModuleMenuItem[];
  mount(container: string | HTMLElement, moduleConfiguration?: ModuleConfiguration): void;
  unmount(): void;
}

//used a parameter for the mount method of the `Module` interface.
export interface ModuleConfiguration {
  userId?: () => string;
  userToken?: () => string;
  userfeedback?: UserFeedbackService;
}
