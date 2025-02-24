/**
 * Interface representing the methods for encrypted storage.
 */
export interface EncryptedStorage {
  /**
   * Stores an encrypted value in sessionStorage.
   * @param key The storage key.
   * @param value The value to encrypt and store.
   */
  setItem(key: string, value: unknown): void;

  /**
   * Retrieves and decrypts a value from sessionStorage.
   * @param key The storage key.
   * @returns The decrypted value.
   */
  getItem<T>(key: string): T | null;

  /**
   * Removes an item from sessionStorage.
   * @param key The storage key to remove.
   */
  removeItem(key: string): void;

  /**
   * Clears all items from sessionStorage.
   */
  clear(): void;

  /**
   * Gets all storage keys.
   * @returns Array of storage keys.
   */
  getKeys(): string[];
}