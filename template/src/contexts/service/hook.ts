import { useContext } from 'react';
import { ServiceContext } from '.';
import { ServiceContextProps } from './types';

function useService() {
  return useContext<ServiceContextProps>(ServiceContext);
}

export default useService;
