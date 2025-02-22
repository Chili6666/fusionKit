# Microfrontend Monorepo Sample

This monorepo contains multiple packages for building a microfrontend application using Vue 3, TypeScript, and Vite. The main packages are:

- `app-shell`: A sample Vue application.
- `fusion-kit`: Core functionalities for the microfrontend application.
- `fusion-kit-contracts`: Common interfaces and types.
- `fusion-kit-auth0`: Auth0 authentication service.
- `fusion-kit-keycloak`: Keycloak authentication service.
- `fusion-kit-module-federation`: Module Federation based Microservice implementation.

Each package has its on ReadMe


# Vue 3 Example:

`maint.ts`

```ts
//load the configuration
const configManager = await new ConfigurationManagerBuilder()
  .withConfigurationDirectory(window.location.origin + "/config/")
  .withFileToLoad("config.json", "config")
  .withFileToLoad("dynamicRemotes.json", "dynamicRemotes")
  .build();

//create a FactoryCallback
const authServiceFactory = () => AuthFactory.getAuthService(configManager);

//create a instance of the FusionApp. Keep in mind that only the Appname and the Authentication is mandatory. Everything else is optional
const fusionApp = await new FusionAppBuilder()
  .withName("Test-App")
  .withAuthFactory(authServiceFactory)
  .withConfigManager(configManager)
  .withLogger(new ConsoleLogger(LoggerOptions.DEBUG))
  .withEncryptedStorage(new EncryptedStorage('ADD_YOUR_SECRET_KEY'))
  .withRemoteModuleManager(new FederationModuleManager())
  .build();

// Vue specific implementation

//init vue app
const initApp = async () => {
  const isLoggedIn = await fusionApp?.auth.init();
  if (!isLoggedIn) {
    window.alert("User not logged in");
  } else {
    const app = createApp(App);
    app.use(router)
    app.provide("fusionApp", fusionApp);
    app.mount("#app");
  }
};

(async () => {
  await initApp();
})();
```
