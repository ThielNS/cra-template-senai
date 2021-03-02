import { Layout } from 'antd';
import { LayoutProps } from '../types';
import { LayoutFooter } from '../_commons';

const { Content } = Layout;

function CustomLayout({ route, ...props }: LayoutProps) {
  return (
    <Layout className="layout-main">
      <Content className="layout-content" style={route.layoutContentStyle}>
        {props.children}
      </Content>
      <LayoutFooter />
    </Layout>
  );
}

export default CustomLayout;
