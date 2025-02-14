
import { AuthService, Logger } from "fusion-kit-contracts";
import { ConfigurationManager, ShellApp } from '..';
import { EncryptedStorage } from '../core/EncryptedStorage';

export class ShellAppBuilder {
  private name: string = "";
  private authServiceFactory: (() => Promise<AuthService>) | undefined;
  private configManager: ConfigurationManager | undefined;
  private logger: Logger | undefined;
  private encryptedStorage: EncryptedStorage | undefined;

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

  withLogger(logger: Logger): ShellAppBuilder {
    this.logger = logger;
    return this;
  };

  withEncryptedStorage(encryptedStorage: EncryptedStorage): ShellAppBuilder {
    this.encryptedStorage = encryptedStorage;
    return this;
  };

  async build(): Promise<ShellApp> {
    if (!this.name || !this.authServiceFactory) {
      throw new Error("Missing required properties to build ShellApp");
    }

    const authService = await this.authServiceFactory();
    const app = new ShellApp(this.name, authService, this.configManager); 
    if(this.logger)
      app.logger = this.logger;
    if(this.encryptedStorage)
      app.encryptedStorage = this.encryptedStorage;
    return app;
  }
}