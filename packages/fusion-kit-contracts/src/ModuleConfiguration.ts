import { EncryptedStorage, UserFeedbackService } from '.';

/**
 * Interface representing the configuration options for a module.
 * This interface is used as a parameter for the mount method of the `Module` interface.
 */
export interface ModuleConfiguration {
  /**
   * Optional function to retrieve the user ID.
   * @returns {string} The user ID.
   */
  userId?: () => string;

  /**
   * Optional function to retrieve the user token.
   * @returns {string} The user token.
   */
  userToken?: () => string;

  /**
   * Optional instance of the UserFeedbackService.
   * This service can be used to provide feedback to the user.
   */
  userfeedback?: UserFeedbackService;

  /**
   * Optional instance of the EncryptedStorage.
   * This service can be used to store sensitive data in an encrypted form.
   */
  encryptedStorage? : EncryptedStorage;
}