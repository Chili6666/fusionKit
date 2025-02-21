/**
 * Represents the configuration required for authentication.
 */
export interface Auth0Config {
  /**
   * The domain used for authentication
   */
  domain: string;

  /**
   * The URL to redirect to after authentication.
   */
  redirectUrl: string;

  /**
   * The client ID used for authentication.
   */
  clientId: string;
}
