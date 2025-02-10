
import { AuthService } from "fusion-kit-contracts";
import { ConfigurationManager, ShellApp } from '.';

export class ShellAppBuilder {
  private name: string = "";
  private authServiceFactory: (() => Promise<AuthService>) | undefined;
  private configManager: ConfigurationManager | undefined;

  withName(name: string): ShellAppBuilder {
    this.name = name;
    return this;
  }

  withAuthFactory(authServiceFactory: () => Promise<AuthService>): ShellAppBuilder {
    this.authServiceFactory = authServiceFactory;
    return this;
  }

  withConfigManager(configManager: ConfigurationManager): ShellAppBuilder {
    this.configManager = configManager;
    return this;
  }

  async build(): Promise<ShellApp> {
    if (!this.name || !this.authServiceFactory) {
      throw new Error("Missing required properties to build ShellApp");
    }

    const authService = await this.authServiceFactory();
    //return new ShellApp(this.name, authService, this.configManager);
    return new ShellApp(this.name, authService, this.configManager!);
  }
}