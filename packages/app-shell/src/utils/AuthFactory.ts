import { Auth0Service, type Auth0Config } from "fusion-kit-auth0";
import type { AuthService } from "fusion-kit-contracts";
import { KeyCloakService, type KeyCloakConfig } from "fusion-kit-keycloak";
import { ConfigurationManager } from "fusion-kit";
import type { Configuration } from '../configuration';

export class AuthFactory {
  public static async getAuthService(configurationManager: ConfigurationManager, useKeyCloak: boolean = true): Promise<AuthService | null> {
    const configurationContext = configurationManager.getContent<Configuration>("config");
    if (!configurationContext) return null;

    if (!useKeyCloak) {
      const authConfig: Auth0Config = {
        domain: configurationContext.auth0.domain,
        clientId: configurationContext.auth0.clientid,
        redirectUrl: configurationContext.auth0.redirectUrl,
      };

      return new Auth0Service(authConfig);
    }

    const keyCloakConfig: KeyCloakConfig = {
      url: configurationContext.keycloak.url,
      realm: configurationContext.keycloak.realm,
      clientId: configurationContext.keycloak.clientid,
    };

    return new KeyCloakService(keyCloakConfig);
  }
}