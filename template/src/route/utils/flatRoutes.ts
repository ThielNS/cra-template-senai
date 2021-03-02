import { RouteCustomProps } from '../types';

function flatRoutes(routes: RouteCustomProps[]): RouteCustomProps[] {
  return routes.reduce<RouteCustomProps[]>((prevRoutes, currentRoute) => {
    if (currentRoute.routes && currentRoute.routes.length) {
      return [...prevRoutes, currentRoute, ...flatRoutes(currentRoute.routes)];
    }

    return [...prevRoutes, currentRoute];
  }, []);
}

export default flatRoutes;
