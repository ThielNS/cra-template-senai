import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { RouteCustomProps } from '../types';
import { flatRoutes } from './';
import routes from '../routes';

function breadcrumbFormat(
  data: RouteCustomProps[] | RouteCustomProps,
  currentPath: string,
): Route[] {
  if (Array.isArray(data)) {
    return flatRoutes(data)
      .filter((route) => route.page && route.menu)
      .reduce<RouteCustomProps[]>(
        (prevRoute, currentRoute, currentIndex, allRoutes) => {
          let routeData = prevRoute;
          const routePosition = allRoutes.findIndex(
            (route) => route.path === currentPath,
          );

          if (currentIndex <= routePosition) {
            routeData = [...routeData, currentRoute];
          }

          return routeData;
        },
        [],
      )
      .map((route) => {
        const breadcrumbName = route.menu?.title
          ? String(route.menu?.title)
          : route.page?.title || '';

        return {
          path: route.path,
          breadcrumbName,
        };
      });
  }

  const routeData = routes.find((route) => route.rootPath === data.rootPath);

  if (routeData) {
    return breadcrumbFormat([routeData], currentPath);
  }

  return [];
}

export default breadcrumbFormat;
