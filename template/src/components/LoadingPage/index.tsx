import { Spin } from 'antd';

import './style.less';

function LoadingPage() {
  return (
    <div className="loading-page">
      <Spin size="large" />
    </div>
  );
}

export default LoadingPage;
