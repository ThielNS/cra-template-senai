import {
  AUTH_STORAGE_DATA_KEY,
  AUTH_STORAGE_ACCESS_TOKEN_KEY,
} from './constants';
import { AuthenticationDefaultProps } from './types';

class AuthStorageManager<AuthData> {
  private storageManager: Storage;

  constructor(storageManager: Storage) {
    this.storageManager = storageManager;
  }

  setAuthentication(auth: AuthenticationDefaultProps): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.storageManager.setItem(
          AUTH_STORAGE_DATA_KEY,
          JSON.stringify(auth.authData),
        );

        this.storageManager.setItem(
          AUTH_STORAGE_ACCESS_TOKEN_KEY,
          auth.accessToken || '',
        );

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  getAuthentication(): Promise<{ authData?: AuthData; accessToken?: string }> {
    return new Promise((resolve, reject) => {
      try {
        const authData = this.storageManager.getItem(AUTH_STORAGE_DATA_KEY);
        const accessToken = this.storageManager.getItem(
          AUTH_STORAGE_ACCESS_TOKEN_KEY,
        );

        resolve({
          authData: authData ? JSON.parse(authData) : undefined,
          accessToken: accessToken ? accessToken : undefined,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  clearAuthentication(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.setAuthentication({
          accessToken: undefined,
          authData: undefined,
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default AuthStorageManager;
