import { Layout } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { LayoutProps } from '../types';
import { PrivateHeader, PrivateSider } from './components';
import {
  SIDER_COLLAPSED_MOBILE_SIZE,
  SIDER_COLLAPSED_SIZE,
  SIDER_SIZE,
} from '../constants';
import { useLayoutStorage, useWindowSize } from '../../hooks';
import { LayoutFooter, LayoutPageHeader } from '../_commons';
import { CollapseType } from 'antd/lib/layout/Sider';

const { Content } = Layout;

function PrivateLayout({ route, ...props }: LayoutProps) {
  const { page } = route;
  const { isMobile, breakpoint } = useWindowSize();
  const { layoutStorage, setLayoutStorage } = useLayoutStorage();

  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (layoutStorage && typeof layoutStorage.isCollapsed === 'boolean') {
      return layoutStorage.isCollapsed;
    }
    return false;
  });
  const [layoutMargin, setLayoutMargin] = useState(SIDER_SIZE);

  useEffect(() => {
    setIsCollapsed(breakpoint.xl);
    setLayoutStorage({ isCollapsed: breakpoint.xl });
  }, [breakpoint.xl]);

  function toggleCollapsed() {
    setIsCollapsed(!isCollapsed);
    setLayoutStorage({ isCollapsed: !isCollapsed });
  }

  function onCollapse(collapsed: boolean, type: CollapseType) {
    setLayoutMargin(collapsed ? SIDER_COLLAPSED_SIZE : SIDER_SIZE);
    setIsCollapsed(!isCollapsed);
    setLayoutStorage({ isCollapsed: !isCollapsed });
  }

  function layoutStyle(): CSSProperties {
    if (isMobile) {
      return { marginLeft: SIDER_COLLAPSED_MOBILE_SIZE };
    }
    if (isCollapsed) {
      return { marginLeft: SIDER_COLLAPSED_SIZE };
    }

    return { marginLeft: layoutMargin };
  }

  return (
    <Layout className="layout-container">
      <PrivateSider onCollapse={onCollapse} collapsed={isCollapsed} />
      <Layout className="layout-main" style={layoutStyle()}>
        <PrivateHeader
          route={route}
          isCollapsed={isCollapsed}
          toggleCollapsed={toggleCollapsed}
        />

        {page?.showPageInfo && <LayoutPageHeader route={route} {...props} />}

        <Content
          className={
            page?.showPageInfo ? 'layout-content -page-info' : 'layout-content'
          }
          style={route.layoutContentStyle}
        >
          {props.children}
        </Content>
        <LayoutFooter />
      </Layout>
    </Layout>
  );
}

export default PrivateLayout;
