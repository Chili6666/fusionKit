export interface Logger {
  /**
   * Method to show the fatal message
   * @param message
   */
  fatal(message: string | string[]): void;

  /**
   * Method to show the error message
   * @param message
   */
  error(message: string | string[]): void;

  /**
   * Method to show the warn message
   * @param message
   */
  warn(message: string | string[]): void;

  /**
   * Method to show the info message
   * @param message
   */
  info(message: string | string[]): void;

  /**
   * Method to show the debug message
   * @param message
   */
  debug(message: string | string[]): void;
}
