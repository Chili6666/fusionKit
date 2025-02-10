import { AuthService, AuthUserProfile } from "fusion-kit-contracts";

import { Auth0Client } from "@auth0/auth0-spa-js";
import { Auth0Config } from './Auth0Config';


export class Auth0Service implements AuthService {
  private auth0: Auth0Client;
  private readonly authConfig: Auth0Config;
  private _token: string | undefined;  

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

  public async init(): Promise<boolean> {
    const isAuthenticated = await this.auth0.isAuthenticated();

    if (!isAuthenticated) {
      if (!window.location.search.includes("code=")) {
        console.log("loginWithRedirect");
        await this.auth0.loginWithRedirect();
        return false;
      } else {
        // We're in the callback, get and store token
        try {
          console.log("getTokenSilently");
          this._token = await this.auth0.getTokenSilently();
          //localStorage.setItem("auth_token", token);
          //console.log("token", token);

          // Optionally store user info
          //const user = await this.auth0.getUser();
          //localStorage.setItem("user", JSON.stringify(user));
          return true;
        } catch (error) {
          console.error("Error storing token:", error);
        }
      }
    }
    return false;
  }

  public get token(): string | undefined {
    return this._token;
  }

  public get isLoggedin(): boolean {
    return !!this._token;
  }

  public async logout(): Promise<void> {
    await this.auth0.logout({
      logoutParams: {
        returnTo: this.authConfig.redirectUrl, //window.location.origin,  // Return to your app's home page
        clientId: this.authConfig.clientId, // Your Auth0 client ID
      },
    });
  }

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
