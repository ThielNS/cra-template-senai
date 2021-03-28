import { ReactNode } from 'react';
import CombineContexts from './CombineContexts';
import {} from '.';

// WARNING: Don`t remove "// Init Providers" comment, because its usely in plop file generator
export default function RootContext({ children }: { children: ReactNode }) {
  return (
    <CombineContexts
      providerList={
        [
          // Init Providers
          // End Providers
        ]
      }
    >
      {children}
    </CombineContexts>
  );
}
