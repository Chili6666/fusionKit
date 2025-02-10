# Microfrontend Monorepo Sample

This monorepo contains multiple packages for building a microfrontend application using Vue 3, TypeScript, and Vite. The main packages are:

- `app-shell`: A sample Vue application.
- `fusion-kit`: Core functionalities for the microfrontend application.
- `fusion-kit-contracts`: Common interfaces and types.
- `fusion-kit-auth0`: Auth0 authentication service.
- `fusion-kit-keycloak`: Keycloak authentication service.

## Packages

### app-shell

The `app-shell` package is the main application shell that integrates various microfrontend services.


### fusion-kit

The `fusion-kit` package contains the core functionalities required for building a microfrontend application. It provides the necessary tools and utilities to manage and integrate various microfrontend services seamlessly.

#### Features

- **Authentication Integration**: Easily integrate different authentication providers.
- **Logging**: Flexible logging support. Can enhanced from the application. Build in default logger.
- **Userfeedback Management**: Fully support displaying different kinds of messages.
- **Configuration Manager**: Supports easy loading and managing typesafe configurations.

#### Installation

To install the `fusion-kit` package, run the following command:

```sh
npm install @your-org/fusion-kit
```

### fusion-kit-contracts

### fusion-kit-auth0

### fusion-kit-keycloak



