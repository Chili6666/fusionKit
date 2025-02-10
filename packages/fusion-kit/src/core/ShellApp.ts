import {
  AuthService,
  FrameAdapter,
  Logger,
  LoggerOptions,
} from "fusion-kit-contracts";
import { ConsoleLogger } from "../services/ConsoleLogger";
import { UserFeedback } from "./UserFeedBack";

/**
 * Represents a microfrontend application.
 */
export class ShellApp {
  private _name: string;
  private _auth: AuthService;
  private _logger: Logger | undefined;
  private _isBusy: boolean = false;
  private _isBusyCallback: ((isBusy: boolean) => void) | undefined;
  private _userFeedback: UserFeedback = new UserFeedback();

  /**
   * Creates an instance of ShellApp.
   * @param name - The name of the application.
   * @param auth - The authentication service used by the application.
   */
  constructor(name: string, auth: AuthService) {
    this._name = name;
    this._auth = auth;    
  }

  /**
   * Registers a frame adapter for e.g. displaying notifications.
   * @param frameAdapter
   */
  public registerFrameAdapter(frameAdapter: FrameAdapter): void {
    this.logger?.info("Registering frame adapter");
    this._userFeedback.registerFrameAdapter(frameAdapter);
  }

  /**
   * Gets the name of the microfrontend application.
   * @returns The name of the application.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Gets the authentication service used by the application.
   * @returns The authentication service.
   */
  public get auth(): AuthService {
    return this._auth;
  }

  /**
   * Gets the logger used by the application.
   * @returns The logger, if no logger is set, a new ConsoleLogger is created.
   */
  public get logger(): Logger | undefined {
    if (!this._logger) this._logger = new ConsoleLogger(LoggerOptions.DEBUG);
    return this._logger;
  }

  public set logger(logger: Logger) {
    this._logger = logger;
  }

  /**
   * Gets the user feedback service used by the application.
   */
  public get userFeedback(): UserFeedback {
    return this._userFeedback;
  }

  /**
   *  Sets the busy state of the app
   * @param busy
   * @returns
   */
  public setBusy = (busy: boolean): void => {
    if (this._isBusy === busy) return;
    this._isBusy = busy;
    this.notifyIsBusyChanged();
  };

  /**
   * Gets the busy state of the app
   */
  public get isBusy(): boolean {
    return this._isBusy;
  }

  public initialize(): void {
    this.logger?.info(`Initializing Microfrontend App: ${this.name}`);
  }

  /**
   * Registers a callback to be called when the busy state changes.
   * @param callback - The callback to register.
   */
  public registerIsBusyCallback(callback: (isBusy: boolean) => void): void {
    this._isBusyCallback = callback;
  }

  /**
   * Notifies the registered callback that the busy state has changed.
   */
  private notifyIsBusyChanged(): void {
    if (this._isBusyCallback) {
      this._isBusyCallback(this._isBusy);
    }
  }
}
