import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthenticationContextProps } from '../../authentication/types';
import { ServiceContextProps, ServiceInterceptors } from '../types';
import { handler401, handlerRedirectPageError } from './statusInterceptors';

// REQUEST

function request(config: AxiosRequestConfig) {
  return config;
}

// RESPONSE

function response(config: AxiosResponse) {
  return config;
}

// ERROR

function error({
  auth,
  service,
}: {
  auth: AuthenticationContextProps;
  service: ServiceContextProps;
}) {
  return async (config: AxiosError): Promise<any> => {
    // 401
    if (config.response?.status === 401 && auth.accessToken) {
      return await handler401({ config, auth, service });
    }

    // 403
    if (config.response?.status === 403) {
      return await handlerRedirectPageError({ config });
    }

    // 500
    if (config.response?.status === 500) {
      return await handlerRedirectPageError({ config });
    }

    return Promise.reject(config);
  };
}

// INTERCEPTOR

function serviceInterceptors(
  auth: AuthenticationContextProps,
): ServiceInterceptors {
  return (service: ServiceContextProps) => ({
    request: [request, error({ auth, service })],
    response: [response, error({ auth, service })],
  });
}

export default serviceInterceptors;
