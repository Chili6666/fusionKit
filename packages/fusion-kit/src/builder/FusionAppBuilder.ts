import { AuthService, Logger, RemoteModuleManager } from 'fusion-kit-contracts';
import { ConfigurationManager, FusionApp } from '..';
import { EncryptedStorage } from '../core/EncryptedStorage';

/**
 * Builder class for creating a FusionApp instance.
 */
export class FusionAppBuilder {
  private name: string = '';
  private authServiceFactory: (() => Promise<AuthService>) | undefined;
  private configManager: ConfigurationManager | undefined;
  private logger: Logger | undefined;
  private encryptedStorage: EncryptedStorage | undefined;
  private remoteModuleManager: RemoteModuleManager | undefined;

  /**
   * Sets the name of the FusionApp.
   * @param name - The name of the application.
   * @returns The current instance of FusionAppBuilder.
   */
  public withName(name: string): FusionAppBuilder {
    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('Invalid name: must be a non-empty string');
    }
    this.name = name;
    return this;
  }

  /**
   * Sets the authentication service factory.
   * @param authServiceFactory - A factory function that returns a promise of AuthService.
   * @returns The current instance of FusionAppBuilder.
   */
  public withAuthFactory(authServiceFactory: () => Promise<AuthService>): FusionAppBuilder {
    if (typeof authServiceFactory !== 'function') {
      throw new Error('Invalid authServiceFactory: must be a function');
    }
    this.authServiceFactory = authServiceFactory;
    return this;
  }

  /**
   * Sets the configuration manager.
   * @param configManager - An instance of ConfigurationManager.
   * @returns The current instance of FusionAppBuilder.
   */
  public withConfigManager(configManager: ConfigurationManager): FusionAppBuilder {
    if (!(configManager instanceof ConfigurationManager)) {
      throw new Error('Invalid configManager: must be an instance of ConfigurationManager');
    }
    this.configManager = configManager;
    return this;
  }

  /**
   * Sets the logger.
   * @param logger - An instance of Logger.
   * @returns The current instance of FusionAppBuilder.
   */
  public withLogger(logger: Logger): FusionAppBuilder {
    this.logger = logger;
    return this;
  }

  /**
   * Sets the encrypted storage.
   * @param encryptedStorage - An instance of EncryptedStorage.
   * @returns The current instance of FusionAppBuilder.
   */
  public withEncryptedStorage(encryptedStorage: EncryptedStorage): FusionAppBuilder {
    if (!(encryptedStorage instanceof EncryptedStorage)) {
      throw new Error('Invalid encryptedStorage: must be an instance of EncryptedStorage');
    }
    this.encryptedStorage = encryptedStorage;
    return this;
  }

  /**
   * Sets the remote module manager.
   * @param remoteModuleManager - An instance of RemoteModuleManager.
   * @returns The current instance of FusionAppBuilder.
   */
  public withRemoteModuleManager(remoteModuleManager: RemoteModuleManager): FusionAppBuilder {
    this.remoteModuleManager = remoteModuleManager;
    return this;
  }

  /**
   * Builds and returns an instance of FusionApp.
   * @returns A promise that resolves to an instance of FusionApp.
   * @throws Error if required properties are missing.
   */
  public async build(): Promise<FusionApp> {
    if (!this.name || !this.authServiceFactory) {
      throw new Error('Missing required properties to build FusionApp');
    }

    const authService = await this.authServiceFactory();
    const app = new FusionApp(this.name, authService);

    // Assign optional properties if they are defined
    Object.assign(app, {
      configurationManager: this.configManager,
      logger: this.logger,
      encryptedStorage: this.encryptedStorage,
      remoteModuleManager: this.remoteModuleManager,
    });

    return app;
  }
}