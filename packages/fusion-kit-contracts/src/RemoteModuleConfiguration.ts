//The `ModuleConfiguration` interface defines the structure for configuring a module that is loaded from a remote server.
//This configuration includes details such as the URL, name, module type, format, and bundler.

import { RemoteModuleConfigurationBundler, RemoteModuleConfigurationFormat } from './TypeDefinitions';

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
