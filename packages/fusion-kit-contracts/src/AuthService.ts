import { AuthUserProfile } from "./AuthUserProfile";

/**
 * Represents an authentication service.
 */
export interface AuthService {
  /**
   * Initializes the authentication service.
   * @returns A promise that resolves to a boolean indicating whether the initialization was successful.
   */
  init(): Promise<boolean>;

  /**
   * Gets the authentication token.
   * @returns The authentication token, if available.
   */
  getToken(): string | undefined;

  /**
   * Logs out the user.
   */
  logout(): Promise<void>;

  /**
   * Gets the user profile information.
   * @returns The user profile information, if available.
   */
  getUserInfo(): Promise<AuthUserProfile | undefined>;
}
