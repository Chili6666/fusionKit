# Fusion Kit - Module Federation

## FederationModuleManager

The `FederationModuleManager` class is responsible for loading and managing remote modules in a module federation setup. It implements the `RemoteModuleManager` interface.

### Methods

#### `loadRemoteModules(moduleConfigurations: RemoteModuleConfiguration[]): Promise<void>`

Loads remote modules based on the provided configurations.

- **Parameters:**
  - `moduleConfigurations`: An array of configurations for the remote modules to be loaded.
- **Returns:** A promise that resolves when all remote modules are loaded.

#### `getRemoteModuleConfiguration(moduleName: string): RemoteModuleConfiguration | undefined`

Gets the configuration of a specific remote module by its name.

- **Parameters:**
  - `moduleName`: The name of the remote module.
- **Returns:** The configuration of the specified remote module, or `undefined` if not found.

#### `getRemoteModuleConfigurations(): RemoteModuleConfiguration[]`

Gets a list of all remote module configurations.

- **Returns:** An array of all remote module configurations.

#### `getLoadedRemoteModules(): Module[]`

Gets a list of all loaded remote modules.

- **Returns:** An array of all loaded remote modules.

#### `getLoadedRemoteModule(moduleName: string): Module | undefined`

Gets a specific loaded remote module by its name.

- **Parameters:**
  - `moduleName`: The name of the remote module.
- **Returns:** The specified loaded remote module, or `undefined` if not found.