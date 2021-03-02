import { LoginOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import { useAuthentication } from '../../../../contexts/authentication';
import { ROUTE_PRIVATE_ROOT_PATH } from '../../../../route/constants';

interface LoginValues {
  email: string;
  password: string;
  role: string;
}

const roleOptions = [
  {
    value: 'admin',
    label: 'Administrador',
  },
  {
    value: 'user',
    label: 'Usuário',
  },
];

function LoginForm() {
  const [form] = Form.useForm<LoginValues>();
  const history = useHistory();
  const { setAuthenticationAsync } = useAuthentication();

  async function onSubmit(values: LoginValues) {
    try {
      await setAuthenticationAsync({
        accessToken: 'MY_ACCESS_TOKEN',
        authData: values,
      }).then(() => history.push(ROUTE_PRIVATE_ROOT_PATH));
    } catch {}
  }

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          { required: true },
          { type: 'email', message: 'E-mail inválido' },
        ]}
      >
        <Input placeholder="email@exemplo.com" />
      </Form.Item>

      <Form.Item name="password" label="Senha" rules={[{ required: true }]}>
        <Input.Password placeholder="••••••" />
      </Form.Item>

      <Form.Item name="role" label="Perfil" rules={[{ required: true }]}>
        <Select options={roleOptions} placeholder="Selecione um perfil" />
      </Form.Item>

      <Button htmlType="submit" block type="primary" icon={<LoginOutlined />}>
        Acessar
      </Button>
    </Form>
  );
}

export default LoginForm;
