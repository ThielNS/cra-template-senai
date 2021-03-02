import { RouteCustomProps } from '../types';

function formatRoutes(
  routes: RouteCustomProps[],
  parent?: RouteCustomProps,
): RouteCustomProps[] {
  return routes.map((route) => {
    let currentRoute: RouteCustomProps = {
      path: route.path,
      rootPath: route.path,
      isFake: false,
      layout: route.layout || 'public',
      redirectAuth: true,
    };

    if (typeof route.redirectAuth === 'boolean') {
      currentRoute = {
        ...currentRoute,
        redirectAuth: route.redirectAuth,
      };
    }

    if (route.page && typeof route.page.showPageInfo === 'undefined') {
      currentRoute = {
        ...currentRoute,
        page: { ...route.page, showPageInfo: true },
      };
    }

    if (parent) {
      currentRoute = {
        ...currentRoute,
        path: `${parent.path}${route.path}`,
        rootPath: parent.rootPath,
        layout: route.layout || parent.layout,
      };
    }

    if (route.routes && route.routes.length) {
      currentRoute = {
        ...currentRoute,
        routes: formatRoutes(route.routes, { ...route, ...currentRoute }),
      };
    }

    return { ...route, ...currentRoute };
  });
}

export default formatRoutes;
