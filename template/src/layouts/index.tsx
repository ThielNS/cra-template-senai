import PrivateLayout from './Private';
import PublicLayout from './Public';
import { LayoutProps } from './types';
import { useAuthentication } from '../contexts/authentication';

import './style.less';
import { ROUTE_PRIVATE_ROOT_PATH } from '../route/constants';

function LayoutProvider({ route, ...props }: LayoutProps) {
  const { authData, accessToken } = useAuthentication<{ role: string }>();

  if (route?.layout === 'private') {
    if (
      (route.roles?.length && !route.roles.includes(authData?.role)) ||
      !accessToken
    ) {
      props.history.push('/403');
      return null;
    }

    return <PrivateLayout {...props} route={route} />;
  }

  if (route?.layout === 'custom') {
    if (!route.layoutComponent) {
      throw new Error(
        `É necessário informar um layoutComponent para a rota "${route.path}"`,
      );
    }

    const { layoutComponent: LayoutComponent } = route;

    return <LayoutComponent {...props} route={route} />;
  }

  if (route.layout === 'public' && route.redirectAuth && accessToken) {
    props.history.push(ROUTE_PRIVATE_ROOT_PATH);
  }

  return <PublicLayout {...props} route={route} />;
}

export { default as PublicLayout } from './Public';
export { default as PrivateLayout } from './Private';

export default LayoutProvider;
