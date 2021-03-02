import { ReactNode } from 'react';

export interface AuthenticationDefaultProps<AuthData = any> {
  authData: AuthData;
  accessToken?: string;
}
export interface AuthenticationContextProps<AuthData = any>
  extends AuthenticationDefaultProps<AuthData> {
  setAuthenticationAsync: (props: AuthenticationDefaultProps) => Promise<any>;
  clearAuthenticationAsync: () => Promise<void>;
}

export interface AuthenticationProviderProps {
  storageManager: Storage;
  children:
    | ReactNode
    | (<T>(
        props: AuthenticationContextProps<T> & { isMounted: boolean },
      ) => ReactNode);
}
