/**
 * Represents a user profile for authentication purposes.
 */
export interface AuthUserProfile {
  /**
   * The unique identifier of the user.
   */
  id?: string;

  /**
   * The username of the user.
   */
  username?: string;

  /**
   * The email address of the user.
   */
  email?: string;

  /**
   * The first name of the user.
   */
  firstName?: string;

  /**
   * The last name of the user.
   */
  lastName?: string;

  /**
   * Indicates whether the user is enabled.
   */
  enabled?: boolean;

  /**
   * Indicates whether the user's email is verified.
   */
  emailVerified?: boolean;

  /**
   * Indicates whether Time-based One-Time Password (TOTP) is enabled for the user.
   */
  totp?: boolean;

  /**
   * The timestamp when the user was created.
   */
  createdTimestamp?: number;

  /**
   * Additional attributes of the user.
   */
  attributes?: Record<string, unknown>;
}
