import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Col, Layout, PageHeader, Row } from 'antd';
import { CSSProperties } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthentication } from '../../../../contexts/authentication';
import useWindowSize from '../../../../hooks/useWindowSize';
import { RouteCustomProps } from '../../../../route/types';
import { ROUTE_PUBLIC_ROOT_PATH } from '../../../../route/constants';
import { SIDER_MOBILE_SIZE } from '../../../constants';
import { PrivateHeaderProps } from '../../../types';
import { LayoutMenu } from '../../../_commons';

import './style.less';

const { Header } = Layout;

function PrivateHeader({ isCollapsed, toggleCollapsed }: PrivateHeaderProps) {
  const { isMobile } = useWindowSize();
  const { clearAuthenticationAsync } = useAuthentication();
  const history = useHistory();

  const App = process.env;
  const pageTitle = isMobile ? App.REACT_APP_NAME : '';
  const className = isMobile ? 'private-header -fixed' : 'private-header';

  function filterRoutes(routes: RouteCustomProps<{ header?: boolean }>[]) {
    return routes
      .filter((route) => route.layout === 'private')
      .filter((route) => route.extra?.header);
  }

  function headerPadding(): CSSProperties {
    if (isMobile && isCollapsed) {
      return { transform: `translateX(0px)` };
    }
    if (isMobile && !isCollapsed) {
      return { transform: `translateX(${SIDER_MOBILE_SIZE}px)` };
    }

    return { transform: `translateX(0px)` };
  }

  async function logout() {
    await clearAuthenticationAsync();
    history.push(ROUTE_PUBLIC_ROOT_PATH);
  }

  return (
    <Header
      className={className}
      style={{ ...headerPadding(), paddingRight: 24 }}
    >
      <Row align="middle" justify="space-between" wrap={false}>
        <Col>
          <PageHeader
            backIcon={
              isMobile &&
              (isCollapsed ? (
                <MenuUnfoldOutlined color="#000" />
              ) : (
                <MenuFoldOutlined color="#000" />
              ))
            }
            onBack={toggleCollapsed}
            title={pageTitle}
          />
        </Col>
        <Col className="layout-main-header-menu">
          <Row align="middle" wrap={false} gutter={20}>
            <Col>
              <LayoutMenu filterRoutes={filterRoutes} mode="horizontal" />
            </Col>
            <Col>
              <Button
                danger
                icon={<LogoutOutlined />}
                type="link"
                onClick={logout}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
}

export default PrivateHeader;
