import { useContext } from 'react';
import { AuthenticationContext } from '.';
import { AuthenticationContextProps } from './types';

function useAuthentication<AuthData>() {
  return useContext<AuthenticationContextProps<AuthData>>(
    AuthenticationContext,
  );
}

export default useAuthentication;
