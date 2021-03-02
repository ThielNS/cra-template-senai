import { MenuProps } from 'antd';
import { SiderProps } from 'antd/lib/layout';
import { ReactNode } from 'react';
import { PageProps, RouteCustomProps } from '../route/types';

export interface LayoutProps extends PageProps {
  children: ReactNode;
}

export interface PrivateSiderProps extends SiderProps {}

export interface PrivateHeaderProps {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
  route: RouteCustomProps;
}

// Menu
export interface LayoutMenuProps extends MenuProps {
  filterRoutes: (routes: RouteCustomProps[]) => RouteCustomProps[];
}

export type RenderMenuItem = (route: RouteCustomProps) => JSX.Element | null;
export type FilterRoutes = (routes: RouteCustomProps[]) => RouteCustomProps[];
