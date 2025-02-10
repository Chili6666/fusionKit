export class ConfigurationManager {
  private contentMap = new Map<string, any>();

  public constructor(private configurationDirectory: string) {
    // Ensure the configuration directory ends with a '/'
    if (!configurationDirectory.endsWith("/")) {
      configurationDirectory += "/";
    }
  }

  public async loadJsonContent(filename: string, type: string): Promise<void> {
    // Combine the directory and filename to get the full path
    const url = `${this.configurationDirectory}${filename}`;

    try {
      // Check if content is already loaded
      if (this.contentMap.has(type)) {
        console.log(`Content of type ${type} already loaded`);
        return;
      }

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "reload",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const content = await response.json();
      this.contentMap.set(type, content);

      return content;
    } catch (error) {
      throw new Error(`Failed to load JSON content from ${url}: ${error}`);
    }
  }

  public getContent<T>(type: string): T | undefined {
    return this.contentMap.get(type) as T;
  }
}
