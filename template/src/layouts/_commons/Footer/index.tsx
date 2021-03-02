import { Layout } from 'antd';

import './style.less';

const { Footer } = Layout;

function LayoutFooter() {
  const App = process.env;
  const date = new Date();

  return (
    <Footer className="layout-footer">
      {`${App.REACT_APP_NAME} ©${date.getFullYear()} Created by Thiel.`}
    </Footer>
  );
}

export default LayoutFooter;
