import { AuthService, Logger, RemoteModuleManager } from 'fusion-kit-contracts';
import { ConfigurationManager, FusionApp } from '..';
import { EncryptedStorage } from '../core/EncryptedStorage';

export class FusionAppBuilder {
  private name: string = '';
  private authServiceFactory: (() => Promise<AuthService>) | undefined;
  private configManager: ConfigurationManager | undefined;
  private logger: Logger | undefined;
  private encryptedStorage: EncryptedStorage | undefined;
  private remoteModuleManager: RemoteModuleManager | undefined;

  withName(name: string): FusionAppBuilder {
    this.name = name;
    return this;
  }

  withAuthFactory(authServiceFactory: () => Promise<AuthService>): FusionAppBuilder {
    this.authServiceFactory = authServiceFactory;
    return this;
  }

  withConfigManager(configManager: ConfigurationManager): FusionAppBuilder {
    this.configManager = configManager;
    return this;
  }

  withLogger(logger: Logger): FusionAppBuilder {
    this.logger = logger;
    return this;
  }

  withEncryptedStorage(encryptedStorage: EncryptedStorage): FusionAppBuilder {
    this.encryptedStorage = encryptedStorage;
    return this;
  }

  withRemoteModuleManager(remoteModuleManager: RemoteModuleManager): FusionAppBuilder {
    this.remoteModuleManager = remoteModuleManager;
    return this;
  }

  async build(): Promise<FusionApp> {
    if (!this.name || !this.authServiceFactory) {
      throw new Error('Missing required properties to build ShellApp');
    }

    const authService = await this.authServiceFactory();
    const app = new FusionApp(this.name, authService, this.configManager);
    if (this.logger) app.logger = this.logger;
    if (this.encryptedStorage) app.encryptedStorage = this.encryptedStorage;
    if (this.remoteModuleManager) app.remoteModuleManager = this.remoteModuleManager;
    return app;
  }
}
