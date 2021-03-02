import { Layout } from 'antd';
import { LayoutProps } from '../types';
import { LayoutFooter } from '../_commons';
import { PublicHeader } from './components';

const { Content } = Layout;

function PublicLayout({ route, ...props }: LayoutProps) {
  return (
    <Layout className="layout-main">
      <PublicHeader />
      <Content className="layout-content" style={route.layoutContentStyle}>
        {props.children}
      </Content>
      <LayoutFooter />
    </Layout>
  );
}

export default PublicLayout;
