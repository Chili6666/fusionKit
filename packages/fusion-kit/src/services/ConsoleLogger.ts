import { Logger, LoggerOptions } from 'fusion-kit-contracts';

export class ConsoleLogger implements Logger {
  constructor(private readonly logOption: LoggerOptions) {}

  /**
   * The method gets a logMessage as parameter and calls the log function with the logger option FATAL and the logMessage
   * @param logMessage
   */
  public fatal(logMessage: string, expressive?: boolean): void {
    this.log(LoggerOptions.FATAL, logMessage, expressive);
  }

  /**
   * The method gets a logMessage as parameter and calls the log function with the logger option ERROR and the logMessage
   * @param logMessage
   */
  public error(logMessage: string, expressive?: boolean): void {
    this.log(LoggerOptions.ERROR, logMessage, expressive);
  }

  /**
   * The method gets a logMessage as parameter and calls the log function with the logger option WARN and the logMessage
   * @param logMessage
   */
  public warn(logMessage: string, expressive?: boolean): void {
    this.log(LoggerOptions.WARN, logMessage, expressive);
  }

  /**
   * The method gets a logMessage as parameter and calls the log function with the logger option INFO and the logMessage
   * @param logMessage
   */
  public info(logMessage: string, expressive?: boolean): void {
    this.log(LoggerOptions.INFO, logMessage, expressive);
  }

  /**
   * The method gets a logMessage as parameter and calls the log function with the logger option DEBUG and the logMessage
   * @param logMessage
   */
  public debug(logMessage: string, expressive?: boolean): void {
    this.log(LoggerOptions.DEBUG, logMessage, expressive);
  }

  private log(level: LoggerOptions, message: string, expressive?: boolean): void {
    // If the level is bigger than the logLevel, we go out of this function and return nothing.
    if (!this.shouldLog(level)) return;
    let dispatchMessage = console.log;
    let color = '#444858';

    if (level === LoggerOptions.FATAL || level === LoggerOptions.ERROR) {
      dispatchMessage = console.error;
      color = '#B52B30';
    } else if (level === LoggerOptions.INFO) {
      dispatchMessage = console.info;
      color = '#0046B5';
    } else if (level === LoggerOptions.WARN) {
      dispatchMessage = console.warn;
      color = '#8C5600';
    }

    const concatMessage = JSON.stringify({
      level,
      message,
      timestamp: new Date().toISOString(),
    });

    if (expressive) {
      dispatchMessage(`%c ${concatMessage}`, `background: ${color}; color: #FFF; border-radius: 4px`);
    } else {
      dispatchMessage(concatMessage);
    }
  }

  private shouldLog(level: LoggerOptions): boolean {
    return level <= this.logOption;
  }
}
