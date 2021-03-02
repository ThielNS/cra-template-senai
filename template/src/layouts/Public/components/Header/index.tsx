import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Layout, PageHeader, Row } from 'antd';
import { useEffect, useState } from 'react';
import useWindowSize from '../../../../hooks/useWindowSize';
import { RouteCustomProps } from '../../../../route/types';
import { LayoutMenu } from '../../../_commons';

import './style.less';

const { Header } = Layout;

function PublicHeader() {
  const { isMobile } = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);
  const App = process.env;
  const pageTitle = App.REACT_APP_NAME;

  useEffect(() => {
    if (!isMobile) {
      setIsVisible(false);
    }
  }, [isMobile]);

  function toggleIsVisible() {
    setIsVisible(!isVisible);
  }

  function filterRoutes(routes: RouteCustomProps[]) {
    return routes.filter((route) => route.layout === 'public' || !route.layout);
  }

  return (
    <Header className="public-header">
      <Row align="middle" justify="space-between">
        <Col>
          <PageHeader title={pageTitle} />
        </Col>
        {isMobile ? (
          <>
            <Button
              icon={isVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              type="link"
              onClick={toggleIsVisible}
            />
            <Drawer
              title="Menu"
              placement="right"
              visible={isVisible}
              onClose={toggleIsVisible}
              closable
              bodyStyle={{ padding: 0 }}
            >
              <LayoutMenu filterRoutes={filterRoutes} mode="inline" />
            </Drawer>
          </>
        ) : (
          <Col className="layout-main-header-menu">
            <LayoutMenu filterRoutes={filterRoutes} mode="horizontal" />
          </Col>
        )}
      </Row>
    </Header>
  );
}

export default PublicHeader;
