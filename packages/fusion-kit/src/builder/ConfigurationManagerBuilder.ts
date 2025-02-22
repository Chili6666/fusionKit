import { ConfigurationManager } from '..';

export class ConfigurationManagerBuilder {
  private configurationDirectory: string = '';
  private filesToLoad: { filename: string; id: string }[] = [];

  withConfigurationDirectory(directory: string): ConfigurationManagerBuilder {
    this.configurationDirectory = directory;
    return this;
  }

  withFileToLoad(filename: string, id: string): ConfigurationManagerBuilder {
    this.filesToLoad.push({ filename, id: id });
    return this;
  }

  async build(): Promise<ConfigurationManager> {
    if (!this.configurationDirectory) {
      throw new Error('Configuration directory is required to build ConfigurationManager');
    }

    const configManager = new ConfigurationManager(this.configurationDirectory);

    for (const file of this.filesToLoad) {
      await configManager.loadJsonContent(file.filename, file.id);
    }

    return configManager;
  }
}
