import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import { ConfigurationManagerBuilder, FusionAppBuilder } from "fusion-kit";
import { KeyCloakService, type KeyCloakConfig } from "fusion-kit-keycloak";
import type { Configuration } from "./configuration";

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
  .withAuthFactory(authServiceFactory)
  .build();

//************************************************************************/
//it is also posible to create a fusion app with the following code

//const fapp = new FusionApp('name', new KeyCloakService({parameter}))

//************************************************************************/

const initApp = async () => {
  const isLoggedIn = await fusionApp?.auth.init();
  if (!isLoggedIn) window.alert("User not logged in");
  else {
    const app = createApp(App);
    app.provide("fusionApp", fusionApp);
    app.use(router);
    app.mount("#app");
  }
};

(async () => {
  await initApp();
})();
