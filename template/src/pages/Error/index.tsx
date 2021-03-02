import { HomeOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { ROUTE_PUBLIC_ROOT_PATH } from '../../route/constants';
import { PageProps } from '../../route/types';

function ErrorPage({ route, history }: PageProps) {
  return (
    <Result
      {...route.page}
      extra={
        <Button
          type="primary"
          icon={<HomeOutlined />}
          ghost
          onClick={() => history.push(ROUTE_PUBLIC_ROOT_PATH)}
        >
          Ir para o início
        </Button>
      }
    />
  );
}

export default ErrorPage;
