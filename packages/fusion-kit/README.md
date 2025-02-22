# FusionKit Documentation

# FusionKit Documentation

## Table of Contents

- [FusionApp](#fusionapp)
- [ConfigurationManager](#configurationmanager)
- [EncryptedStorage](#encryptedstorage)
- [UserFeedback](#userfeedback)
- [ConfigurationManagerBuilder](#configurationmanagerbuilder)
- [FusionAppBuilder](#fusionappbuilder)

## FusionApp

The `FusionApp` class represents a microfrontend application. It provides various functionalities such as authentication, configuration management, logging, and user feedback.

### Constructor

```typescript
constructor(name: string, auth: AuthService)
```

- `name`: The name of the application.
- `auth`: The authentication service used by the application.

### Methods

#### `registerFrameAdapter(frameAdapter: FrameAdapter): void`

Registers a frame adapter for automatic interactions between the shell and the FusionApp. e.g. Toast, Messagebox,...

#### `get name(): string`

Gets the name of the application.

#### `get auth(): AuthService`

Gets the authentication service used by the application.

#### `get configurationManager(): ConfigurationManager | undefined`

Gets the configuration manager used by the application.

#### `set configurationManager(configurationManager: ConfigurationManager): void`

Sets the configurationManager used by the application.

#### `get logger(): Logger | undefined`

Gets the logger used by the application. If no logger is set, a new deafult `ConsoleLogger` is created.

#### `set logger(logger: Logger): void`

Sets the logger used by the application.

#### `get encryptedStorage(): EncryptedStorage | undefined`

Gets the encrypted storage used by the application.

#### `set encryptedStorage(encryptedStorage: EncryptedStorage | undefined): void`

Sets the encrypted storage used by the application.

#### `get userFeedback(): UserFeedback`

Gets the user feedback service used by the application.

#### `get remoteModuleManager(): RemoteModuleManager | undefined`

Gets the remote module manager used by the application.

#### `set remoteModuleManager(remoteModuleManager: RemoteModuleManager | undefined): void`

Sets the remote module manager used by the application.

#### `setBusy(busy: boolean): void`

Sets the busy state of the application.

#### `get isBusy(): boolean`

Gets the busy state of the application.

#### `initialize(): void`

Initializes the microfrontend application.

#### `registerIsBusyCallback(callback: (isBusy: boolean) => void): void`

Registers a callback to be called when the busy state changes.


## ConfigurationManager

The `ConfigurationManager` class is responsible for loading and managing configuration content.

### Constructor

```typescript
constructor(configurationDirectory: string)
```

- `configurationDirectory`: The directory where configuration files are located.

### Methods

#### `loadJsonContent(filename: string, id: string): Promise<void>`

Loads JSON content from a file and stores it in the content map. Is accessable by it's id

#### `getContent<T>(id: string): T | undefined`

Gets the content of the specified id from the content map.

### Example

```typescript
const configManager = new ConfigurationManager('/config/');
await configManager.loadJsonContent('settings.json', 'settings');
const settings = configManager.getContent<Settings>('settings');
```


## EncryptedStorage

The `EncryptedStorage` class provides methods to store, retrieve, and manage encrypted data in `sessionStorage`.

### Constructor

```typescript
constructor(encryptionKey: string)
```

- `encryptionKey`: The key used for encryption and decryption. 

### Methods

#### `setItem(key: string, value: unknown): void`

Stores an encrypted value in `sessionStorage`.

- `key`: The storage key.
- `value`: The value to encrypt and store.

#### `getItem<T>(key: string): T | null`

Retrieves and decrypts a value from `sessionStorage`.

- `key`: The storage key.
- Returns: The decrypted value or `null` if the key does not exist.

#### `removeItem(key: string): void`

Removes an item from `sessionStorage`.

- `key`: The storage key to remove.

#### `clear(): void`

Clears all items from `sessionStorage`.

#### `getKeys(): string[]`

Gets all storage keys.

- Returns: An array of storage keys.

### Example

```typescript
const encryptedStorage = new EncryptedStorage('my-secret-key');
encryptedStorage.setItem('user', { name: 'John Doe' });
const user = encryptedStorage.getItem<{ name: string }>('user');
console.log(user?.name); // Output: John Doe
encryptedStorage.removeItem('user');
encryptedStorage.clear();
```


## UserFeedback

The `UserFeedback` class provides methods for handling user feedback such as notifications and messages.

### Methods

#### `registerFrameAdapter(frameAdapter: FrameAdapter): void`

Registers a frame adapter for displaying notifications.

- `frameAdapter`: The frame adapter to register.

#### `showNotification(message: string | undefined, notificationType: NotificationTypes): void`

Displays a notification.

- `message`: The message to display.
- `notificationType`: The type of notification.

#### `showNotifications(notifications: { message: string | undefined; notificationType: NotificationTypes; }[]): void`

Displays multiple notifications.

- `notifications`: An array of notifications to display.

#### `showMessageBox(title: string, messages: MessageBoxMessage[], cancelButtonText: string, confirmButtonText: string, confirmCallback?: () => void, cancelCallback?: () => void): void`

Displays a message box.

- `title`: The title of the message box.
- `messages`: An array of messages to display.
- `cancelButtonText`: The text for the cancel button.
- `confirmButtonText`: The text for the confirm button.
- `confirmCallback`: The callback to execute when the confirm button is clicked (optional).
- `cancelCallback`: The callback to execute when the cancel button is clicked (optional).

#### `showToast(message: string, toastType: ToastTypes): void`

Displays a toast message.

- `message`: The message to display.
- `toastType`: The type of toast.

### Example

```typescript
const userFeedback = new UserFeedback();
userFeedback.registerFrameAdapter(myFrameAdapter);
userFeedback.showNotification('Welcome!', NotificationTypes.INFO);
userFeedback.showToast('Operation successful', ToastTypes.SUCCESS);
```


## ConfigurationManagerBuilder

The `ConfigurationManagerBuilder` class is used to build and configure an instance of `ConfigurationManager`.

### Methods

#### `withConfigurationDirectory(directory: string): ConfigurationManagerBuilder`

Sets the configuration directory.

- `directory`: The directory where configuration files are located.
- Returns: The `ConfigurationManagerBuilder` instance.

#### `withFileToLoad(filename: string, id: string): ConfigurationManagerBuilder`

Adds a file to load during the build process.

- `filename`: The name of the file to load.
- `id`: The identifier of content being loaded.
- Returns: The `ConfigurationManagerBuilder` instance.

#### `build(): Promise<ConfigurationManager>`

Builds and returns an instance of `ConfigurationManager`.

- Returns: A promise that resolves to an instance of `ConfigurationManager`.

### Example

```typescript
const builder = new ConfigurationManagerBuilder();
const configManager = await builder
  .withConfigurationDirectory('/config/')
  .withFileToLoad('settings.json', 'settings')
  .build();

const settings = configManager.getContent<Settings>('settings');
console.log(settings);
```

## FusionAppBuilder

The `FusionAppBuilder` class is used to build and configure an instance of `FusionApp`.

### Methods

#### `withName(name: string): FusionAppBuilder`

Sets the name of the application.

- `name`: The name of the application.
- Returns: The `FusionAppBuilder` instance.

#### `withAuthFactory(authServiceFactory: () => Promise<AuthService>): FusionAppBuilder`

Sets the authentication service factory.

- `authServiceFactory`: A factory function that returns a promise resolving to an `AuthService` instance.
- Returns: The `FusionAppBuilder` instance.

#### `withConfigManager(configManager: ConfigurationManager): FusionAppBuilder`

Sets the configuration manager.

- `configManager`: An instance of `ConfigurationManager`.
- Returns: The `FusionAppBuilder` instance.

#### `withLogger(logger: Logger): FusionAppBuilder`

Sets the logger.

- `logger`: An instance of `Logger`.
- Returns: The `FusionAppBuilder` instance.

#### `withEncryptedStorage(encryptedStorage: EncryptedStorage): FusionAppBuilder`

Sets the encrypted storage.

- `encryptedStorage`: An instance of `EncryptedStorage`.
- Returns: The `FusionAppBuilder` instance.

#### `withRemoteModuleManager(remoteModuleManager: RemoteModuleManager): FusionAppBuilder`

Sets the remote module manager.

- `remoteModuleManager`: An instance of `RemoteModuleManager`.
- Returns: The `FusionAppBuilder` instance.

#### `build(): Promise<FusionApp>`

Builds and returns an instance of `FusionApp`.

- Returns: A promise that resolves to an instance of `FusionApp`.

### Example

```typescript
const builder = new FusionAppBuilder();
const fusionApp = await builder
  .withName('MyApp')
  .withAuthFactory(() => authServiceFactory())
  .withConfigManager(configManager)
  .withLogger(logger)
  .withEncryptedStorage(encryptedStorage)
  .withRemoteModuleManager(remoteModuleManager)
  .build();

```
