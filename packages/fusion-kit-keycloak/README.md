
# Fusion Kit - Keycloak

This library implements the `AuthService` interface for Keycloak authentication, providing configuration and service classes to handle authentication processes.

## KeyCloakConfig Interface

The `KeyCloakConfig` interface represents the configuration required for authentication.

### Properties

### `url: string`

The URL of the authentication server.

- **Type:** `string`

#### `realm: string`

The realm used for authentication.

- **Type:** `string`

#### `clientId: string`

The client ID used for authentication.

- **Type:** `string`


## KeyCloakService Class

The `KeyCloakService` class is a service for handling authentication using Keycloak. It implements the `AuthService` interface.

### Constructor

#### `constructor(keyCloakConfig: KeyCloakConfig)`

Creates an instance of `KeyCloakService`.

- **Parameters:**
  - `keyCloakConfig`: The authentication configuration.

### Methods

#### `init(): Promise<boolean>`

Initializes the Keycloak service and attempts to authenticate the user.

- **Returns:** A promise that resolves to a boolean indicating whether the user was authenticated.

#### `logout(): Promise<void>`

Logs out the user.

- **Returns:** A promise that resolves when the logout process is complete.

#### `getUserInfo(): Promise<AuthUserProfile | undefined>`

Gets the user profile information.

- **Returns:** A promise that resolves to the user profile information, if available.

#### `token: string | undefined`

Gets the authentication token.

- **Returns:** The authentication token, if available.

#### `isLoggedin: boolean`

Checks if the user is logged in.

- **Returns:** A boolean indicating whether the user is logged in.