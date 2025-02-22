import { AuthService, AuthUserProfile } from 'fusion-kit-contracts';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { Auth0Config } from './Auth0Config';

/**
 * Service class for handling authentication with Auth0.
 */
export class Auth0Service implements AuthService {
  private auth0: Auth0Client;
  private readonly authConfig: Auth0Config;
  private _token: string | undefined;

  /**
   * Creates an instance of Auth0Service.
   * @param authConfig - The configuration for Auth0.
   */
  constructor(authConfig: Auth0Config) {
    this.authConfig = authConfig;
    this.auth0 = new Auth0Client({
      domain: authConfig.domain,
      clientId: authConfig.clientId,
      authorizationParams: {
        redirect_uri: authConfig.redirectUrl,
      },
    });
  }

  /**
   * Initializes the Auth0 service.
   * @returns A promise that resolves to a boolean indicating whether the user is authenticated.
   */
  public async init(): Promise<boolean> {
    const isAuthenticated = await this.auth0.isAuthenticated();

    if (!isAuthenticated) {
      if (!window.location.search.includes('code=')) {
        console.log('loginWithRedirect');
        await this.auth0.loginWithRedirect();
        return true;
      } else {
        // We're in the callback, get and store token
        try {
          // Get Access Token
          this._token = await this.auth0.getTokenSilently();

          // Get ID Token claims (user info)
          // const claims = await this.auth0.getIdTokenClaims();
          // const idToken = claims?.__raw;  // The actual ID token

          // Get full user info
          // const user = await this.auth0.getUser();
          return true;
        } catch (error) {
          console.error('Error storing token:', error);
        }
      }
    }
    return false;
  }

  /**
   * Gets the authentication token.
   * @returns The authentication token, or undefined if not authenticated.
   */
  public get token(): string | undefined {
    return this._token;
  }

  /**
   * Checks if the user is logged in.
   * @returns A boolean indicating whether the user is logged in.
   */
  public get isLoggedin(): boolean {
    return !!this._token;
  }

  /**
   * Logs out the user.
   * @returns A promise that resolves when the user is logged out.
   */
  public async logout(): Promise<void> {
    await this.auth0.logout({
      logoutParams: {
        returnTo: this.authConfig.redirectUrl, // Return to your app's home page
        clientId: this.authConfig.clientId, // Your Auth0 client ID
      },
    });
  }

  /**
   * Gets the user information.
   * @returns A promise that resolves to the user profile, or undefined if not authenticated.
   */
  public async getUserInfo(): Promise<AuthUserProfile | undefined> {
    if (!(await this.auth0.isAuthenticated())) return undefined;
    const user = await this.auth0.getUser();
    if (!user) return undefined;
    return {
      id: user.sub,
      username: user.name,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    };
  }
}
