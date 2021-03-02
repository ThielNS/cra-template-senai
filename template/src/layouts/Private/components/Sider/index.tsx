import { Divider, Layout, PageHeader } from 'antd';
import useWindowSize from '../../../../hooks/useWindowSize';
import { RouteCustomProps } from '../../../../route/types';
import {
  SIDER_COLLAPSED_MOBILE_SIZE,
  SIDER_COLLAPSED_SIZE,
  SIDER_SIZE,
} from '../../../constants';
import { PrivateSiderProps } from '../../../types';
import { LayoutMenu } from '../../../_commons';

import './style.less';

const { Sider } = Layout;

function PrivateSider(props: PrivateSiderProps) {
  const { isMobile } = useWindowSize();
  const App = process.env;

  function collapsedWidth() {
    if (isMobile) {
      return SIDER_COLLAPSED_MOBILE_SIZE;
    } else {
      return SIDER_COLLAPSED_SIZE;
    }
  }

  function filterRoutes(routes: RouteCustomProps<{ header?: boolean }>[]) {
    return routes
      .filter((route) => route.layout === 'private')
      .filter((route) => !route.extra?.header);
  }

  return (
    <Sider
      className="private-sider"
      theme="dark"
      collapsible
      trigger={isMobile ? null : undefined}
      // breakpoint="xl"
      collapsedWidth={collapsedWidth()}
      width={SIDER_SIZE}
      {...props}
    >
      <PageHeader
        style={{ textAlign: 'center' }}
        className="project-name"
        title={App.REACT_APP_NAME}
      />

      <Divider />

      <LayoutMenu filterRoutes={filterRoutes} mode="inline" theme="dark" />
    </Sider>
  );
}

export default PrivateSider;
