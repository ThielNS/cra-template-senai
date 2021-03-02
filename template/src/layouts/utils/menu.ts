import { match } from 'react-router-dom';
import { RouteCustomProps } from '../../route/types';
import { flatRoutes } from '../../route/utils';
import { RenderMenuItem, FilterRoutes } from '../types';

/**
 * Function for validate visualization of menu
 */
export function isInvalidRole(roles: string[], authData: any) {
  return (
    Array.isArray(roles) && !!roles.length && !roles.includes(authData?.role)
  );
}

/**
 * Function for display menu item selected
 */
export function menuSelectedKeys(
  routes: RouteCustomProps[],
  routeMatch: match,
) {
  return flatRoutes(routes)
    .filter((route) => route.path === routeMatch.path)
    .map((route) => route.path);
}

/**
 * Fuction for open menu items by default
 */
export function menuDefaultOpenKeys(
  routes: RouteCustomProps[],
  routeMatch: match,
) {
  const paths = routeMatch.path.split('/').filter((path) => path);
  const pathIndicator = paths[0];

  return flatRoutes(routes)
    .filter((route) => route.path.split('/').includes(pathIndicator))
    .map((route) => route.path);
}

/**
 * Fuction for render menu items inside a antd Menu component
 */
export function renderMenuItems(
  routes: RouteCustomProps[],
  renderMenuItem: RenderMenuItem,
  filterRoutes?: FilterRoutes,
) {
  let data = routes;

  if (filterRoutes) {
    data = filterRoutes(routes);
  }

  // Return just routes with menu object with a filter if necessary
  return (
    data
      .filter((route) => route.menu)
      .map(renderMenuItem)
      // This remove null itens in array
      .filter((route) => route)
  );
}
