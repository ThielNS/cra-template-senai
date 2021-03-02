import { AxiosRequestConfig } from 'axios';

export const serviceDefaultConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
};
