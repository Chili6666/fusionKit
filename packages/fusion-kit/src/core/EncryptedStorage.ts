import CryptoJS from 'crypto-js';

export class EncryptedStorage {
  private readonly encryptionKey: string;

  constructor(encryptionKey: string) {
    if (!encryptionKey) {
      throw new Error('Encryption key is required');
    }
    this.encryptionKey = encryptionKey;
  }

  /**
   * Stores an encrypted value in sessionStorage
   * @param key The storage key
   * @param value The value to encrypt and store
   */
  public setItem(key: string, value: any): void {
    try {
      // Convert value to string if it's an object
      const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
      
      // Encrypt the value
      const encryptedValue = CryptoJS.AES.encrypt(stringValue, this.encryptionKey).toString();
      
      // Store the encrypted value
      sessionStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Error setting encrypted item:', error);
      throw new Error('Failed to set encrypted item in storage');
    }
  }

  /**
   * Retrieves and decrypts a value from sessionStorage
   * @param key The storage key
   * @returns The decrypted value
   */
  public getItem<T>(key: string): T | null {
    try {
      const encryptedValue = sessionStorage.getItem(key);
      
      if (!encryptedValue) {
        return null;
      }

      // Decrypt the value
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, this.encryptionKey);
      const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);

      // Parse the decrypted string if it's JSON
      try {
        return JSON.parse(decryptedString);
      } catch {
        return decryptedString as unknown as T;
      }
    } catch (error) {
      console.error('Error getting encrypted item:', error);
      throw new Error('Failed to get encrypted item from storage');
    }
  }

  /**
   * Removes an item from sessionStorage
   * @param key The storage key to remove
   */
  removeItem(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item:', error);
      throw new Error('Failed to remove item from storage');
    }
  }

  /**
   * Clears all items from sessionStorage
   */
  public clear(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error('Failed to clear storage');
    }
  }

  /**
   * Gets all storage keys
   * @returns Array of storage keys
   */
  public getKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  }
}