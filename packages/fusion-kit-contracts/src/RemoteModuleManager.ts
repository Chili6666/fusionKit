import { Module, RemoteModuleConfiguration } from './ModuleConfiguration';

/**
 * RemoteModuleManager is responsible for loading remote modules and managing their lifecycle.
 */
export interface RemoteModuleManager {
  /**
   * Loads all remote modules.
   * @param moduleConfigurations
   */
  loadRemoteModules(moduleConfigurations: RemoteModuleConfiguration[]): Promise<void>;

  /**
   * Unloads a specific remote module.
   * @param moduleName
   */
  getRemoteModuleConfiguration(moduleName: string): RemoteModuleConfiguration | undefined;

  /**
   * Gets a list of remote module configurations.
   */
  getRemoteModuleConfigurations: RemoteModuleConfiguration[];

  /**
   * Gets a list of loaded remote modules.
   */
  getLoadedRemoteModules: Module[];

  /**
   * Gets a specific loaded remote module.
   * @param moduleName
   */
  getLoadedRemoteModule(moduleName: string): Module | undefined;
}
