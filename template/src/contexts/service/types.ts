import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { ReactNode } from 'react';

export interface ServiceContextProps extends AxiosInstance {}

type ServiceRequest = (config: AxiosRequestConfig) => AxiosRequestConfig;
type ServiceResponse = (config: AxiosResponse) => AxiosResponse;
type ServiceError = (config: AxiosError) => Promise<any>;

export type ServiceInterceptors = (
  service: ServiceContextProps,
) => {
  request: [ServiceRequest, ServiceError];
  response: [ServiceResponse, ServiceError];
};

export interface ServiceProviderProps {
  children: ReactNode | ((service: ServiceContextProps) => ReactNode);
  config?: AxiosRequestConfig;
  interceptors?: ServiceInterceptors;
}
