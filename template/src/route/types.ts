import { MenuItemProps, PageHeaderProps } from 'antd';
import { ResultStatusType } from 'antd/lib/result';
import { ComponentType, CSSProperties } from 'react';
import { RouteProps, RouteComponentProps } from 'react-router-dom';
import { LayoutProps } from '../layouts/types';

export type LayoutType = 'private' | 'public' | 'custom';

type Menu = MenuItemProps & {
  icon: ComponentType;
  isClickable?: boolean;
  insideSubmenu?: Menu;
};

type Page = PageHeaderProps & {
  showPageInfo?: boolean;
  title: string;
  status?: ResultStatusType;
};

export interface RouteCustomProps<Extra = any> extends RouteProps {
  layout?: LayoutType;
  layoutComponent?: ComponentType<LayoutProps>;
  layoutContentStyle?: CSSProperties;
  roles?: string[];
  menu?: Menu;
  routes?: RouteCustomProps[];
  path: string;
  page?: Page;
  rootPath?: string;
  isFake?: boolean;
  redirectAuth?: boolean;
  extra?: Extra;
}

export interface PageProps extends RouteComponentProps {
  route: RouteCustomProps;
}
