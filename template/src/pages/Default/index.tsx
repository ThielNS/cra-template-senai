import { Empty } from 'antd';
import { PageProps } from '../../route/types';

function DefaultPage({ route, ...props }: PageProps) {
  return (
    <div>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 200,
        }}
        description={
          <div>
            <h2>{route.page?.title}</h2>
            <p>{route.path}</p>
            <p>{route.page?.subTitle}</p>
            <small>Página padrão de exibição</small>
          </div>
        }
      />
    </div>
  );
}

export default DefaultPage;
