# Vue 3 + TypeScript + Vite + Fusion Kit

## Overview

This project is a sample project that demonstrates how easy it is to use the Fusion Kit for various functionalities such as authentication, configuration loading and management, session storage, logging, and handling the usage of microfrontends (MFEs). One of the key features of this project is that the MFE configuration is dynamically changeable without the need for recompilation.

## Features

### Authentication

The project integrates with multiple authentication providers, including Keycloak and Auth0, to handle user authentication seamlessly. The `AuthService` interface is implemented by different services to provide a consistent authentication experience.

### Configuration Loading and Management

Configuration loading and management are handled efficiently, allowing the application to load configurations dynamically. This ensures that changes to configurations can be applied without the need for recompilation.

### Session Storage

Session storage is managed to maintain user sessions and other relevant data across different parts of the application. This ensures a smooth user experience by preserving the state between sessions.

### Logging

The project includes a robust logging mechanism to log messages at various levels of severity. This helps in monitoring and debugging the application effectively.

### Microfrontends (MFEs)

The project demonstrates the usage of microfrontends, allowing different parts of the application to be developed and deployed independently. The MFE configuration is dynamically changeable, meaning that changes to the configuration can be applied without the need for recompilation. This provides great flexibility and scalability to the application.

## Dynamic MFE Configuration

One of the standout features of this project is the ability to change the MFE configuration dynamically. This means that you can update the configuration of microfrontends without having to recompile the entire application. This is achieved through the use of the `FederationModuleManager` class, which handles the loading and management of remote modules.

## Project Structure

The project is structured as follows:

- **src/router/index.ts**: Defines the routes for the application, including the routes for microfrontends.
- **src/views**: Contains the views for the application, including the `HomeView` and `MicroFrontendWrapper`.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Build the solution `lerna run build` only the first time after you cloned the repository
3. Run the development server using `npm-run-all --parallel build:mfe* preview:mfe* dev:shell`.

Due to the fact that Lerna is used to make things easier, I provided a script where you can start the solution with one click.

## Conclusion

This sample project showcases the power and flexibility of the Fusion Kit in building modern web applications. By integrating various functionalities such as authentication, configuration management, session storage, logging, and microfrontends, the project demonstrates how to build scalable and maintainable applications with ease.

Feel free to explore the code and adapt it to your own needs. Happy coding!