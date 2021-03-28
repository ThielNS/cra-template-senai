import { ReactNode } from 'react';

function CombineContexts({
  providerList,
  children,
}: {
  providerList: any[];
  children: ReactNode;
}) {
  if (!providerList.length) {
    return <>{children}</>;
  }

  return (
    <>
      {providerList.reduceRight((prevChildren, Component, index) => {
        if (index === 0) {
          return <Component>{children}</Component>;
        }
        return <Component>{prevChildren}</Component>;
      }, null)}
    </>
  );
}

export default CombineContexts;
