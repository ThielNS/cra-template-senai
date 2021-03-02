import { UserOutlined } from '@ant-design/icons';
import { RouteCustomProps } from './types';
import { formatRoutes } from './utils';
import { DefaultPage, ErrorPage, LoginPage } from '../pages';
import { RepositoryListPage } from '../pages/Repository';
import CustomLayout from '../layouts/Custom';
import { AvatarCommon } from '../components/_commons';
import {
  ROUTE_ACCESS_PATH,
  ROUTE_PRIVATE_ROOT_PATH,
  ROUTE_PUBLIC_ROOT_PATH,
} from './constants';

const routes: RouteCustomProps[] = formatRoutes([
  // Custom routes
  {
    path: '/custom',
    exact: true,
    component: DefaultPage,
    layout: 'custom',
    layoutComponent: CustomLayout,
    page: { title: 'Layout Custom' },
  },

  // Public routes
  {
    path: ROUTE_PUBLIC_ROOT_PATH,
    exact: true,
    component: DefaultPage,
    page: { title: 'Início' },
  },
  {
    path: ROUTE_ACCESS_PATH,
    exact: true,
    component: LoginPage,
    menu: { icon: UserOutlined, title: 'Acessar' },
    page: { title: 'Login' },
  },

  // Private routes
  {
    path: ROUTE_PRIVATE_ROOT_PATH,
    exact: true,
    component: DefaultPage,
    layout: 'private',
    page: { title: 'Página inícial' },
    menu: { icon: UserOutlined, title: 'Aplicação' },
  },
  {
    path: '/repositories',
    exact: true,
    component: RepositoryListPage,
    layout: 'private',
    roles: ['admin'],
    page: { title: 'Lista de repositórios' },
    menu: {
      icon: UserOutlined,
      title: 'Repositórios',
      insideSubmenu: { icon: UserOutlined, title: 'Listagem' },
    },
    routes: [
      {
        path: '/sub-page',
        exact: true,
        component: DefaultPage,
        menu: { icon: UserOutlined, title: 'Sub página' },
        page: { title: 'Sub página de exemplo' },
      },
    ],
  },

  // Private route with extra prop
  {
    path: '/profile',
    exact: true,
    component: DefaultPage,
    layout: 'private',
    page: { title: 'Perfil' },
    menu: {
      icon: AvatarCommon,
      className: 'layout-menu-item-custom',
    },
    extra: { header: true },
  },

  // Routes errors
  {
    path: '/403',
    exact: true,
    layout: 'custom',
    layoutComponent: CustomLayout,
    component: ErrorPage,
    page: {
      title: '403',
      subTitle: 'Foi mal! Você não tem permissão para ver essa página.',
      status: 403,
    },
  },
  {
    path: '/500',
    layout: 'custom',
    layoutComponent: CustomLayout,
    component: ErrorPage,
    page: {
      title: '500',
      subTitle: 'Eita! Algo de errado não está certo.',
      status: 500,
    },
  },
  {
    path: '',
    layout: 'custom',
    layoutComponent: CustomLayout,
    component: ErrorPage,
    page: {
      title: '404',
      subTitle: 'Ops! A página solicitada não existe.',
      status: 404,
    },
  },
]);

export default routes;
