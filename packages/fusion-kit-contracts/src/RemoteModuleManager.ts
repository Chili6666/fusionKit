import { Module, RemoteModuleConfiguration } from './ModuleConfiguration';

/**
 * RemoteModuleManager is responsible for loading remote modules and managing their lifecycle.
 */
export interface RemoteModuleManager {
  /**
   * Loads all remote modules.
   * @param moduleConfigurations - An array of configurations for the remote modules to be loaded.
   * @returns A promise that resolves when all remote modules are loaded.
   */
  loadRemoteModules(moduleConfigurations: RemoteModuleConfiguration[]): Promise<void>;

  /**
   * Gets the configuration of a specific remote module.
   * @param moduleName - The name of the remote module.
   * @returns The configuration of the specified remote module, or undefined if not found.
   */
  getRemoteModuleConfiguration(moduleName: string): RemoteModuleConfiguration | undefined;

  /**
   * Gets a list of all remote module configurations.
   * @returns An array of all remote module configurations.
   */
  getRemoteModuleConfigurations(): RemoteModuleConfiguration[];

  /**
   * Gets a list of all loaded remote modules.
   * @returns An array of all loaded remote modules.
   */
  getLoadedRemoteModules(): Module[];

  /**
   * Gets a specific loaded remote module.
   * @param moduleName - The name of the remote module.
   * @returns The specified loaded remote module, or undefined if not found.
   */
  getLoadedRemoteModule(moduleName: string): Module | undefined;
}
