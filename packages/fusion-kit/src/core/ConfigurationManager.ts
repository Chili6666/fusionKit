/**
 * Class responsible for managing configuration files.
 */
export class ConfigurationManager {
  private contentMap = new Map<string, unknown>();

  /**
   * Creates an instance of ConfigurationManager.
   * @param configurationDirectory - The directory where configuration files are located.
   */
  public constructor(private configurationDirectory: string) {
    // Ensure the configuration directory ends with a '/'
    if (!configurationDirectory.endsWith('/')) {
      configurationDirectory += '/';
    }
  }

  /**
   * Loads JSON content from a file and stores it in the content map.
   * @param filename - The name of the file to load.
   * @param id - The identifier for the file content.
   * @returns A promise that resolves when the content is loaded.
   * @throws Error if the content fails to load.
   */
  public async loadJsonContent(filename: string, id: string): Promise<void> {
    // Combine the directory and filename to get the full path
    const url = `${this.configurationDirectory}${filename}`;

    try {
      // Check if content is already loaded
      if (this.contentMap.has(id)) {
        console.log(`Content with the identifier ${id} is already loaded.`);
        return;
      }

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'reload',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const content = await response.json();
      this.contentMap.set(id, content);
    } catch (error) {
      throw new Error(`Failed to load JSON content from ${url}: ${error}`);
    }
  }

  /**
   * Retrieves the content associated with the given identifier.
   * @param id - The identifier for the content.
   * @returns The content associated with the identifier, or undefined if not found.
   */
  public getContent<T>(id: string): T | undefined {
    return this.contentMap.get(id) as T;
  }
}
