import { Card, Divider } from 'antd';
import { PageProps } from '../../route/types';
import { LoginForm } from './components';

import './style.less';

function LoginPage(props: PageProps) {
  return (
    <div className="login-container">
      <Card className="login-card">
        <h2>Login</h2>
        <p>Informe dados fakes para acessar</p>
        <Divider />
        <LoginForm />
      </Card>
    </div>
  );
}

export default LoginPage;
