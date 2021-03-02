import { createContext, useEffect, useState } from 'react';
import {
  AuthenticationContextProps,
  AuthenticationDefaultProps,
  AuthenticationProviderProps,
} from './types';
import AuthStorageManager from './AuthStorageManager';

export const AuthenticationContext = createContext(
  {} as AuthenticationContextProps<any>,
);

function AuthenticationProvider(props: AuthenticationProviderProps) {
  const [authManager] = useState(
    new AuthStorageManager<any>(props.storageManager),
  );
  const [authData, setAuthData] = useState<any>();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    getAuthenticationAsync();
  }, []);

  async function setAuthenticationAsync(authProps: AuthenticationDefaultProps) {
    await authManager.setAuthentication(authProps).then(() => {
      setAccessToken(authProps.accessToken);
      setAuthData(authProps.authData);
    });

    return authProps;
  }

  async function getAuthenticationAsync() {
    await authManager
      .getAuthentication()
      .then((authProps) => {
        setAuthData(authProps.authData);
        setAccessToken(authProps.accessToken);
      })
      .finally(() => setIsMounted(true));
  }

  async function clearAuthenticationAsync() {
    await authManager
      .clearAuthentication()
      .then(() => {
        setAuthData(undefined);
        setAccessToken(undefined);
      })
      .finally(() => setIsMounted(true));
  }

  function renderChildren() {
    if (typeof props.children === 'function') {
      return props.children({
        isMounted,
        authData,
        accessToken,
        setAuthenticationAsync,
        clearAuthenticationAsync,
      });
    }

    return isMounted && props.children;
  }

  return (
    <AuthenticationContext.Provider
      value={{
        authData,
        accessToken,
        setAuthenticationAsync,
        clearAuthenticationAsync,
      }}
    >
      {renderChildren()}
    </AuthenticationContext.Provider>
  );
}

export { default as useAuthentication } from './hook';

export default AuthenticationProvider;
