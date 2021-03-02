import { useEffect } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import LayoutProvider from '../../layouts';
import { RouteCustomProps } from '../types';

function RouteCustom({
  layout,
  menu,
  routes,
  page,
  component: Component,
  ...route
}: RouteCustomProps): JSX.Element {
  const componentProps = { route: { layout, menu, routes, page, ...route } };

  useEffect(() => {
    if (page) {
      document.title = page.title;
    }
  }, [page]);

  function renderComponent(props: RouteComponentProps) {
    const meshProps = { ...props, ...componentProps };

    if (Component) {
      return (
        <LayoutProvider {...meshProps}>
          <Component {...meshProps} />
        </LayoutProvider>
      );
    }

    return null;
  }

  return <Route {...route} render={renderComponent} />;
}

export default RouteCustom;
