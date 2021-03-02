import { PageHeader } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';
import { breadcrumbFormat } from '../../../route/utils';
import { LayoutProps } from '../../types';

function LayoutPageHeader({ route, ...props }: LayoutProps) {
  const { page } = route;

  function itemRender(routeItem: Route, params: any, routes: Array<Route>) {
    const isLastRoute = routes.indexOf(routeItem) === routes.length - 1;

    return isLastRoute ? (
      <span>{routeItem.breadcrumbName}</span>
    ) : (
      <Link to={routeItem.path}>{routeItem.breadcrumbName}</Link>
    );
  }

  return (
    <PageHeader
      onBack={props.history.goBack}
      breadcrumb={{ routes: breadcrumbFormat(route, route.path), itemRender }}
      {...page}
    />
  );
}

export default LayoutPageHeader;
