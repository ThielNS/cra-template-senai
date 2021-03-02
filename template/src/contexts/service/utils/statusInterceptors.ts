import { AxiosError } from 'axios';
import { AuthenticationContextProps } from '../../authentication/types';
import { ServiceContextProps } from '../types';

export interface HandlerStatus {
  config: AxiosError;
  auth?: AuthenticationContextProps;
  service?: ServiceContextProps;
}

const { history } = window;

export async function handler401({ auth, config, service }: HandlerStatus) {
  return new Promise(async (resolve, reject) => {
    try {
      if (auth && service) {
        const { accessToken } = await auth.setAuthenticationAsync({
          authData: { role: 'admin' },
          accessToken: 'token 398e7df30186c04af452be321b343d47489fff1a',
        });

        await service
          .request({
            ...config.config,
            headers: { Authorization: accessToken },
          })
          .then((res) => resolve(res))
          .catch(() => {
            auth.clearAuthenticationAsync();

            reject(config);

            if (history) {
              history.pushState(null, '', '');
            }
          });
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function handlerRedirectPageError({ config }: HandlerStatus) {
  if (history) {
    history.pushState(null, '', String(config.response?.status));
  }

  return Promise.reject(config);
}
