/**
 * Represents the configuration required for authentication.
 */
export interface KeyCloakConfig {
  /**
   * The URL of the authentication server.
   */
  url: string;

  /**
   * The realm used for authentication.
   */
  realm: string;

  /**
   * The client ID used for authentication.
   */
  clientId: string;
}
