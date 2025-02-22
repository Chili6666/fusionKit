import { ConfigurationManager } from '..';

/**
 * Builder class for creating a ConfigurationManager instance.
 */
export class ConfigurationManagerBuilder {
  private configurationDirectory: string = '';
  private filesToLoad: Map<string, string> = new Map();

  /**
   * Sets the configuration directory.
   * @param directory - The directory where configuration files are located.
   * @returns The current instance of ConfigurationManagerBuilder.
   * @throws Error if the directory is invalid.
   */
  public withConfigurationDirectory(directory: string): ConfigurationManagerBuilder {
    if (typeof directory !== 'string' || directory.trim() === '') {
      throw new Error('Invalid configuration directory: must be a non-empty string');
    }
    this.configurationDirectory = directory;
    return this;
  }

  /**
   * Adds a file to the list of files to load.
   * @param filename - The name of the file to load.
   * @param id - The identifier for the file content.
   * @returns The current instance of ConfigurationManagerBuilder.
   * @throws Error if the filename or id is invalid, or if the id already exists.
   */
  public withFileToLoad(filename: string, id: string): ConfigurationManagerBuilder {
    if (typeof filename !== 'string' || filename.trim() === '') {
      throw new Error('Invalid filename: must be a non-empty string');
    }
    if (typeof id !== 'string' || id.trim() === '') {
      throw new Error('Invalid id: must be a non-empty string');
    }
    if (this.filesToLoad.has(id)) {
      throw new Error(`Duplicate id: ${id}`);
    }
    this.filesToLoad.set(id, filename);
    return this;
  }

  /**
   * Builds and returns an instance of ConfigurationManager.
   * @returns A promise that resolves to an instance of ConfigurationManager.
   * @throws Error if the configuration directory is not set.
   */
  public async build(): Promise<ConfigurationManager> {
    if (!this.configurationDirectory) {
      throw new Error('Configuration directory is required to build ConfigurationManager');
    }

    const configManager = new ConfigurationManager(this.configurationDirectory);

    // Load all files concurrently
    await Promise.all(
      Array.from(this.filesToLoad.entries()).map(async ([id, filename]) => {
        await configManager.loadJsonContent(filename, id);
      }),
    );

    return configManager;
  }
}