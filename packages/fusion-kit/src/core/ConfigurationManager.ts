export class ConfigurationManager {
  private contentMap = new Map<string, unknown>();

  public constructor(private configurationDirectory: string) {
    // Ensure the configuration directory ends with a '/'
    if (!configurationDirectory.endsWith('/')) {
      configurationDirectory += '/';
    }
  }

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

      return content;
    } catch (error) {
      throw new Error(`Failed to load JSON content from ${url}: ${error}`);
    }
  }

  public getContent<T>(id: string): T | undefined {
    return this.contentMap.get(id) as T;
  }
}
