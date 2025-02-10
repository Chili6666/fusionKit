import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { ConfigurationManager, ShellApp } from "fusion-kit";
import { AuthFactory } from "./utils/AuthFactory";
import type { Configuration } from './configuration';

//manage config
const configManager = new ConfigurationManager(window.location.origin + "/config/");
await configManager.loadJsonContent<Configuration>("config.json", "config");

//initialize auth service
const authFactory: AuthFactory = new AuthFactory();
const authService = await authFactory.getAuthService(configManager, false);

if (authService === null) {
  throw new Error("Auth service not found");
}

//create shell app instance.
const shellApp: ShellApp = new ShellApp("shell", authService);
/*

 const shellAppBuilder = new ShellAppBuilder();
  const shellApp = shellAppBuilder
    .withName("shell")
    .withAuth(authService)
    .withConfigManager(configManager)
    .build();
*/

//shellApp.addService("shell", shellApp);

//init vue app
const initApp = async () => {
  await shellApp?.auth.init();
  const app = createApp(App);
  app.provide("shellApp", shellApp);
  app.mount("#app");
};

initApp();
