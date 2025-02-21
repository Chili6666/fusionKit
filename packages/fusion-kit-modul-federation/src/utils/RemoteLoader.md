# Federation Description

- https://github.com/originjs/vite-plugin-federation

## IRemoteConfig

```ts
interface IRemoteConfig {
    url: (() => Promise<string>) | string; 
    format: "esm" | "systemjs" | "var";   
    from: "vite" | "webpack;
}
```

## __federation_method_getRemote

```ts
/**
 * Returns a component from a remote.
 * @param {string} remoteName - The name of the remote.
 * @param {string} componentName - The name of the component to retrieve.
 * @returns {Promise<unknown>} - The retrieved component.
 */
function __federation_method_getRemote(remoteName: string, componentName: string): Promise<unknown>;
```

## __federation_method_setRemote

```ts
/**
 * Adds a new remote to the shared map of all remotes on the page.
 * @param {string} name - The name of the remote.
 * @param {IRemoteConfig} config - The configuration of the remote.
 */
function __federation_method_setRemote(name: string, config: IRemoteConfig): void;
```

## __federation_method_unwrapDefault
```ts
/**
 * Unwraps a module and returns its default export or the module itself.
 * @param {unknown} module - The module to unwrap.
 * @returns {unknown} - The default export or the module itself.
 */
function __federation_method_unwrapDefault(module: unknown): unknown;
```

## __federation_method_ensure

```ts
/**
 * Checks if a module is initialized and initializes it if necessary.
 * @param {string} remoteName - The name of the remote.
 * @returns {Promise<unknown>} - The initialized remote.
 */
async function __federation_method_ensure(remoteName: string): Promise<unknown>;
```