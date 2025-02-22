import { Module, RemoteModuleConfiguration, RemoteModuleManager } from 'fusion-kit-contracts';
import { loadDynamicRemoteModule } from './utils/remoteLoader';

interface LoadedModule {
  module: unknown;
  name: string;
}

export class FederationModuleManager implements RemoteModuleManager {
  private _moduleConfigurations: RemoteModuleConfiguration[] = [];
  private _remoteModules: LoadedModule[] = [];

  /**
   * Load remote modules
   * @param moduleConfigurations
   */
  public async loadRemoteModules(moduleConfigurations: RemoteModuleConfiguration[]) {
    this._moduleConfigurations = moduleConfigurations;
    if (!moduleConfigurations || moduleConfigurations.length === 0) {
      return;
    }
    for (const moduleConfiguration of moduleConfigurations) {
      const remoteModule = await loadDynamicRemoteModule(
        moduleConfiguration.url,
        moduleConfiguration.name,
        moduleConfiguration.module,
        moduleConfiguration.format,
        moduleConfiguration.bundler,
      );

      this._remoteModules.push({
        module: remoteModule,
        name: moduleConfiguration.name,
      });
    }
  }

  /**
   * Get remote module configuration by its name
   * @param moduleName
   * @returns
   */
  public getRemoteModuleConfiguration(moduleName: string): RemoteModuleConfiguration | undefined {
    return this._moduleConfigurations.find(module => module.name === moduleName);
  }

  /**
   * Get all remote module configurations
   */
  public getRemoteModuleConfigurations(): RemoteModuleConfiguration[] {
    return [...this._moduleConfigurations];
  }

  /**
   * Get all loaded remote modules
   */
  public getLoadedRemoteModules(): Module[] {
    return this._remoteModules.map(loadedModule => loadedModule.module as Module);
  }

  /**
   * Get loaded remote module by its name
   * @param moduleName
   * @returns
   */
  public getLoadedRemoteModule(moduleName: string): Module | undefined {
    const res = this._remoteModules.find(module => module.name === moduleName);
    return res?.module as Module;
  }
}
