import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { ConfigurationManagerBuilder, ConsoleLogger } from "fusion-kit";
import { AuthFactory } from "./utils/AuthFactory";
import { ShellAppBuilder } from "fusion-kit";
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
const shellApp = await new ShellAppBuilder()
  .withName("shell")
  .withAuthFactory(authServiceFactory)
  .withConfigManager(configManager)
  .withLogger(new ConsoleLogger(LoggerOptions.DEBUG))
  .build();

//init vue app
const initApp = async () => {
  const isLoggedIn = await shellApp?.auth.init();
  if (!isLoggedIn) {
    window.alert("User not logged in");
  } else {
    const app = createApp(App);
    app.provide("shellApp", shellApp);
    app.mount("#app");
  }
};

initApp();
