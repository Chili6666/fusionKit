import { UserFeedbackService } from '.';

//used a parameter for the mount method of the `Module` interface.
export interface ModuleConfiguration {
  userId?: () => string;
  userToken?: () => string;
  userfeedback?: UserFeedbackService;
}
