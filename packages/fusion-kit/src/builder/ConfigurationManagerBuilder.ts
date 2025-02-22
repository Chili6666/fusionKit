import { ConfigurationManager } from '..';

/**
 * Builder class for creating a ConfigurationManager instance.
 */
export class ConfigurationManagerBuilder {
  private configurationDirectory: string = '';
  private filesToLoad: { filename: string; id: string }[] = [];

  /**
   * Sets the configuration directory.
   * @param directory - The directory where configuration files are located.
   * @returns The current instance of ConfigurationManagerBuilder.
   */
  withConfigurationDirectory(directory: string): ConfigurationManagerBuilder {
    this.configurationDirectory = directory;
    return this;
  }

  /**
   * Adds a file to the list of files to load.
   * @param filename - The name of the file to load.
   * @param id - The identifier for the file content.
   * @returns The current instance of ConfigurationManagerBuilder.
   */
  withFileToLoad(filename: string, id: string): ConfigurationManagerBuilder {
    this.filesToLoad.push({ filename, id: id });
    return this;
  }

  /**
   * Builds and returns an instance of ConfigurationManager.
   * @returns A promise that resolves to an instance of ConfigurationManager.
   * @throws Error if the configuration directory is not set.
   */
  async build(): Promise<ConfigurationManager> {
    if (!this.configurationDirectory) {
      throw new Error('Configuration directory is required to build ConfigurationManager');
    }

    const configManager = new ConfigurationManager(this.configurationDirectory);

    // Load all files concurrently
    await Promise.all(
      this.filesToLoad.map(async file => {
        await configManager.loadJsonContent(file.filename, file.id);
      }),
    );

    return configManager;
  }
}
