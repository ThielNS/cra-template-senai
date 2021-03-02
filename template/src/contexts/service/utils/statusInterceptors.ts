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
        // Implement a rule for refresh token
        const hasConfig = false;
        // Remove the code from line 17 to 24 and implement a rule.
        if (!hasConfig) {
          throw new Error(
            `Você não configurou uma regra de 'Refresh Token'.\nAltere o arquivo './src/contexts/service/utils/statusInterceptors.ts'`,
          );
        }

        await service
          .request({
            ...config.config,
            headers: { Authorization: 'MY_NEW_ACCESS_TOKEN' },
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
