import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import {
  ConfigurationManagerBuilder,
  ConsoleLogger,
  FusionAppBuilder,
} from "fusion-kit";
import { KeyCloakService, type KeyCloakConfig } from "fusion-kit-keycloak";
import type { Configuration } from "./configuration";
import { LoggerOptions } from "fusion-kit-contracts";

const configManager = await new ConfigurationManagerBuilder()
  .withConfigurationDirectory(window.location.origin + "/config/")
  .withFileToLoad("config.json", "config")
  .build();

//initialize auth service factory
const authServiceFactory = async () => {
  const configurationContext =
    configManager.getContent<Configuration>("config");
  if (!configurationContext) throw new Error("Failed to load configuration");

  const keyCloakConfig: KeyCloakConfig = {
    url: configurationContext.keycloak.url,
    realm: configurationContext.keycloak.realm,
    clientId: configurationContext.keycloak.clientid,
  };

  return new KeyCloakService(keyCloakConfig);
};

const fusionApp = await new FusionAppBuilder()
  .withName("Test-App")
  .withAuthFactory(authServiceFactory)
  .withConfigManager(configManager)
  .withLogger(new ConsoleLogger(LoggerOptions.DEBUG))
  .build();

const initApp = async () => {
  const isLoggedIn = await fusionApp?.auth.init();
  if (!isLoggedIn) {
    window.alert("User not logged in");
  } else {
    const app = createApp(App);
    app.provide("fusionApp", fusionApp);
    app.mount("#app");
  }
};

(async () => {
  await initApp();
})();
