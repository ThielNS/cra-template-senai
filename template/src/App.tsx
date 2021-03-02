import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/pt_BR';

import { AuthenticationProvider, ServiceProvider } from './contexts';
import RouterNavigation from './route';
import serviceInterceptors from './contexts/service/utils/interceptors';
import { LoadingPage } from './components';

import './assets/styles/global.less';

function App() {
  return (
    <AuthenticationProvider storageManager={localStorage}>
      {({ isMounted, accessToken, ...restAuth }) =>
        isMounted ? (
          <ServiceProvider
            config={{ headers: { Authorization: accessToken } }}
            interceptors={serviceInterceptors({ accessToken, ...restAuth })}
          >
            <ConfigProvider locale={locale}>
              <RouterNavigation />
            </ConfigProvider>
          </ServiceProvider>
        ) : (
          <LoadingPage />
        )
      }
    </AuthenticationProvider>
  );
}

export default App;
