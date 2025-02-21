# Fusion Kit - Auth0

## Auth0Config Interface

The `Auth0Config` interface represents the configuration required for authentication using Auth0.

### Properties

#### `domain: string`

The domain used for authentication.

- **Type:** `string`

#### `redirectUrl: string`

The URL to redirect to after authentication.

- **Type:** `string`

#### `clientId: string`

The client ID used for authentication.

- **Type:** `string`

## Auth0Service

The `Auth0Service` class is a service for handling authentication using Auth0. It implements the `AuthService` interface.

### Constructor

#### `constructor(authConfig: Auth0Config)`

Creates an instance of `Auth0Service`.

- **Parameters:**
  - `authConfig`: The authentication configuration.

### Methods

#### `init(): Promise<boolean>`

Initializes the Auth0 service and attempts to authenticate the user.

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