import { Menu } from 'antd';
import { useAuthentication } from '../../../contexts/authentication';
import { useHistory, useRouteMatch } from 'react-router-dom';
import routes from '../../../route/routes';
import { RouteCustomProps } from '../../../route/types';
import {
  isInvalidRole,
  menuDefaultOpenKeys,
  menuSelectedKeys,
  renderMenuItems,
} from '../../utils/menu';
import { LayoutMenuProps } from '../../types';

function LayoutMenu({ filterRoutes, ...props }: LayoutMenuProps) {
  const { authData } = useAuthentication<{ role: string }>();
  const routeMatch = useRouteMatch();
  const history = useHistory();

  function handlerOnClick(params: any) {
    history.push(params.key);
  }

  function menuItem(route: RouteCustomProps) {
    // Not display menu if have diff role
    if (isInvalidRole(route.roles || [], authData)) return null;

    if (route.menu) {
      const {
        icon: Icon,
        title,
        isClickable,
        insideSubmenu,
        ...restMenu
      } = route.menu;
      let { routes: menuItems, ...restRoute } = route;
      const menuChildren = title || null;

      menuItems = [{ ...restRoute, menu: insideSubmenu }, ...(menuItems ?? [])];

      if (menuItems?.length) {
        const subMenuItens = renderMenuItemsConfig(menuItems);

        // Verify if have a valid sub-menu
        if (subMenuItens.length) {
          return (
            <Menu.SubMenu
              icon={<Icon />}
              title={title}
              key={route.path}
              onTitleClick={isClickable ? handlerOnClick : undefined}
              {...restMenu}
            >
              {subMenuItens}
            </Menu.SubMenu>
          );
        }
      }

      return (
        <Menu.Item icon={<Icon />} key={route.path} {...restMenu}>
          {menuChildren}
        </Menu.Item>
      );
    }

    return null;
  }

  function renderMenuItemsConfig(data: RouteCustomProps[]) {
    // Return just routes with menu object
    return renderMenuItems(data, menuItem, filterRoutes);
  }

  return (
    <Menu
      className="layout-menu"
      selectedKeys={menuSelectedKeys(routes, routeMatch)}
      defaultOpenKeys={menuDefaultOpenKeys(routes, routeMatch)}
      onClick={handlerOnClick}
      {...props}
    >
      {renderMenuItemsConfig(routes)}
    </Menu>
  );
}

export default LayoutMenu;
