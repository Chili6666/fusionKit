import Keycloak from "keycloak-js";
import {
  AuthService,
  AuthUserProfile,
} from "fusion-kit-contracts";
import { KeyCloakConfig } from './KeyCloakConfig';

/**
 * Service for handling authentication using Keycloak.
 */
export class KeyCloakService implements AuthService {
  private keycloak: Keycloak;
  private refreshInterval: NodeJS.Timeout | null = null;

  /**
   * Creates an instance of KeyCloakService.
   * @param keyCloakConfig - The authentication configuration.
   */
  constructor(keyCloakConfig: KeyCloakConfig) {
    const config = keyCloakConfig;
    this.keycloak = new Keycloak(config);
  }

  public async init(): Promise<boolean> {
    try {
      const authenticated = await this.keycloak.init({
        onLoad: "login-required",
        checkLoginIframe: false,
      });

      if (authenticated) {
        this.startTokenRefresh();
      }
      return authenticated;
    } catch (error) {
      console.error("Keycloak initialization failed", error);
      return false;
    }
  }

  public getToken(): string | undefined {
    return this.keycloak.token;
  }

  public async logout(): Promise<void> {
    await this.keycloak.logout();
  }

  public async getUserInfo(): Promise<AuthUserProfile | undefined> {
    return this.keycloak.profile;
  }

  public isLoggedIn(): boolean {
    return !!this.keycloak.authenticated;
  }

  /**
   * Starts the token refresh process.
   */
  private startTokenRefresh(): void {
    console.log("Starting token refresh");
    // Clear any existing interval to prevent multiple refreshes
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    // Set up token refresh every 60 seconds
    this.refreshInterval = setInterval(async () => {
      try {
        // Check if token needs refreshing
        const refreshed = await this.keycloak.updateToken(30); // Refresh if expires in less than 30 seconds
        if (refreshed) {
          console.log("Token refreshed successfully");
        } else {
          console.log("Token does not need to be refreshed");
        }
      } catch (error) {
        console.error("Failed to refresh token", error);
        this.stopTokenRefresh(); // Stop refreshing if there's a persistent error
      }
    }, 60000); // 60 seconds
  }

  /**
   * Stops the token refresh process.
   */
  private stopTokenRefresh(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }
}
