import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from './router'
import { ConfigurationManagerBuilder, ConsoleLogger, EncryptedStorage } from "fusion-kit";
import { AuthFactory } from "./utils/AuthFactory";
import { FusionAppBuilder } from "fusion-kit";
import { LoggerOptions } from 'fusion-kit-contracts';

//manage config
const configManager = await new ConfigurationManagerBuilder()
  .withConfigurationDirectory(window.location.origin + "/config/")
  .withFileToLoad("config.json", "config")
  .build();

//initialize auth service factory
const authServiceFactory = async () => {
  const authService = await AuthFactory.getAuthService(configManager, false);
  if (!authService) throw new Error("Failed to initialize AuthService");
  return authService;
};

//create shell app instance using builder pattern
const fusionApp = await new FusionAppBuilder()
  .withName("Test-App")
  .withAuthFactory(authServiceFactory)
  .withConfigManager(configManager)
  .withLogger(new ConsoleLogger(LoggerOptions.DEBUG))
  .withEncryptedStorage(new EncryptedStorage('ADD_YOUR_SECRET_KEY'))
  .build();

//init vue app
const initApp = async () => {
  const isLoggedIn = await fusionApp?.auth.init();
  if (!isLoggedIn) {
    window.alert("User not logged in");
  } else {
    const app = createApp(App);
    app.use(router)
    app.provide("shellApp", fusionApp);
    app.mount("#app");
  }
};

(async () => {
  await initApp();
})();
