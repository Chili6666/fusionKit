# Fusion Kit - Contracts

- [AuthService Interface](#authservice-interface)
- [Logger Interface](#logger-interface)
- [FrameAdapter Interface](#frameadapter-interface)
- [RemoteModuleManager](#remotemodulemanager)
- [Module Configuration](#module-configuration)

## AuthService Interface

The `AuthService` interface defines methods and properties for managing authentication within an application. It includes methods for initializing the service, logging out, and retrieving user information, as well as properties for accessing the authentication token and checking the login status.

### Methods

#### `init(): Promise<boolean>`

Initializes the authentication service and shows the login screen for the selected Authservice

- **Returns:** A promise that resolves to a boolean indicating whether the Login was successful.

#### `logout(): Promise<void>`

Logs out the user.

- **Returns:** A promise that resolves when the logout process is complete.

#### `getUserInfo(): Promise<AuthUserProfile | undefined>`

Gets the user profile information.

- **Returns:** A promise that resolves to the user profile information, if available.

### Properties

#### `token: string | undefined`

Gets the authentication token.

- **Returns:** The authentication token, if available.

#### `isLoggedin: boolean`

Checks if the user is logged in.

- **Returns:** A boolean indicating whether the user is logged in.

## Logger Interface

The `Logger` interface defines methods for logging messages at various levels of severity. Each method accepts a message or an array of messages to be logged.

### Methods

#### `fatal(message: string | string[]): void`

Logs a fatal message. This indicates a severe error that will prevent the application from continuing.

- **Parameters:**
  - `message`: The message or array of messages to log.

#### `error(message: string | string[]): void`

Logs an error message. This indicates a significant problem that has occurred but does not necessarily stop the application.

- **Parameters:**
  - `message`: The message or array of messages to log.

#### `warn(message: string | string[]): void`

Logs a warning message. This indicates a potential issue or something that should be noted but is not necessarily an error.

- **Parameters:**
  - `message`: The message or array of messages to log.

#### `info(message: string | string[]): void`

Logs an informational message. This is used for general information about the application's operation.

- **Parameters:**
  - `message`: The message or array of messages to log.

#### `debug(message: string | string[]): void`

Logs a debug message. This is used for detailed information useful for debugging the application.

- **Parameters:**
  - `message`: The message or array of messages to log.

## FrameAdapter Interface

The `FrameAdapter` interface defines methods for displaying various types of notifications, message boxes, and toasts within an application. It'S the glue between the FusionApp and the UI

### Methods

#### `showNotification(message: string | undefined, notificationType: NotificationTypes): void`

Displays a single notification.

- **Parameters:**
  - `message`: The message to display in the notification.
  - `notificationType`: The type of notification to display (e.g., success, error).

#### `showNotifications(notifications: { message: string | undefined; notificationType: NotificationTypes; }[]): void`

Displays multiple notifications.

- **Parameters:**
  - `notifications`: An array of objects, each containing a message and a notification type.

#### `showMessageBox(title: string, messages: MessageBoxMessage[], cancelButtonText: string, confirmButtonText: string, confirmCallback?: () => void, cancelCallback?: () => void): void`

Displays a message box with a title, messages, and buttons for confirmation and cancellation.

- **Parameters:**
  - `title`: The title of the message box.
  - `messages`: An array of messages to display in the message box.
  - `cancelButtonText`: The text to display on the cancel button.
  - `confirmButtonText`: The text to display on the confirm button.
  - `confirmCallback`: An optional callback function to execute when the confirm button is clicked.
  - `cancelCallback`: An optional callback function to execute when the cancel button is clicked.

#### `showToast(message: string, toastType: ToastTypes): void`

Displays a toast message.

- **Parameters:**
  - `message`: The message to display in the toast.
  - `toastType`: The type of toast to display (e.g., success, error).

## RemoteModuleManager

The `RemoteModuleManager` interface is responsible for loading remote modules and managing their lifecycle.

### Methods

#### `loadRemoteModules(moduleConfigurations: RemoteModuleConfiguration[]): Promise<void>`

Loads all remote modules.

- **Parameters:**
  - `moduleConfigurations`: An array of configurations for the remote modules to be loaded.
- **Returns:** A promise that resolves when all remote modules are loaded.

#### `getRemoteModuleConfiguration(moduleName: string): RemoteModuleConfiguration | undefined`

Gets the configuration of a specific remote module.

- **Parameters:**
  - `moduleName`: The name of the remote module.
- **Returns:** The configuration of the specified remote module, or `undefined` if not found.

#### `getRemoteModuleConfigurations(): RemoteModuleConfiguration[]`

Gets a list of all remote module configurations.

- **Returns:** An array of all remote module configurations.

#### `getLoadedRemoteModules(): Module[]`

Gets a list of all loaded remote modules.

- **Returns:** An array of all loaded remote modules.

#### `getLoadedRemoteModule(moduleName: string): Module | undefined`

Gets a specific loaded remote module.

- **Parameters:**
  - `moduleName`: The name of the remote module.
- **Returns:** The specified loaded remote module, or `undefined` if not found.


## Module Configuration

### RemoteModuleConfigurationFormat

The `RemoteModuleConfigurationFormat` type defines the possible formats for module configuration. It can be one of the following string literals:

- `esm`: Represents ECMAScript Module format.
- `systemjs`: Represents SystemJS module format.
- `var`: Represents a module format that assigns the module to a global variable.

### RemoteModuleConfigurationBundler

The `RemoteModuleConfigurationBundler` type defines the possible bundlers that can be used for module configuration. It can be one of the following string literals:

- `vite`: Represents the Vite bundler.
- `webpack`: Represents the Webpack bundler.

### RemoteModuleConfiguration Interface

The `RemoteModuleConfiguration` interface defines the structure for configuring a module that is loaded from a remote server. This configuration includes details such as the URL, name, module type, format, and bundler.

### Properties

- **url**: `string`
  - The URL from which the module will be loaded.
- **name**: `string`
  - The name of the module.
- **module**: `string`
  - The type or identifier of the module.
- **format**: `RemoteModuleConfigurationFormat` (optional)
  - The format in which the module is provided.
- **bundler**: `RemoteModuleConfigurationBundler` (optional)

  - The bundler used to bundle the module.

### ModuleMenuItem Interface

The `ModuleMenuItem` interface defines the structure for a menu item within a module. This includes properties for the item's identifier, title, execution capability, icon, execution function, and any sub-menu items.

#### Properties

- **id**: `string`
  - A unique identifier for the menu item.
- **title**: `string`
  - The display title of the menu item.
- **canExecute**: `boolean`
  - A flag indicating whether the menu item can be executed.
- **icon**: `string`
  - The icon associated with the menu item.
- **execute**: `() => void`
  - A function that is executed when the menu item is selected.
- **menuItems**: `ModuleMenuItem[]`
  - An array of sub-menu items, each of which is also a `ModuleMenuItem`.

### Module Interface

The `Module` interface defines the structure for bootstrapping a module, including its identifier, title, description, menu items, and methods for mounting and unmounting the module.

#### Properties

- **name**: `string`
  - The unique identifier for the module.
  
- **title**: `string`
  - The display title of the module.
  
- **description**: `string`
  - A brief description of the module.
  
- **menuItems**: `ModuleMenuItem[]`
  - An array of menu items associated with the module. Each item is defined by the `ModuleMenuItem` interface.


#### Methods

- **mount(container: string | HTMLElement, moduleConfiguration?: ModuleConfiguration): void**
  - Mounts the module to the specified container. The container can be identified by a string (e.g., a CSS selector) or an `HTMLElement`. Optionally, configuration options for the module can be provided.
  - **Parameters:**
    - `container`: The container element or its ID where the module will be mounted.
    - `moduleConfiguration`: Optional configuration options for the module.
  
- **unmount(): void**
  - Unmounts the module, performing any necessary cleanup.
