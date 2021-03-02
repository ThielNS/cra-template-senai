import { useEffect, useState } from 'react';
import { StarOutlined } from '@ant-design/icons';
import { Avatar, notification, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { PageProps } from '../../../route/types';
import { useService } from '../../../contexts/service';
import { Repository } from '../types';
import { LANGUAGES_COLOR } from '../constants';

function RepositoryListPage(props: PageProps) {
  const service = useService();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRepositories();
  }, []);

  async function getRepositories() {
    setLoading(true);
    try {
      await service
        .get<Repository[]>('/users/ThielNS/repos')
        .then(({ data }) => setRepositories(data));
    } catch (error) {
      notification.error({ message: 'Erro ao listar os repositórios!' });
    }
    setLoading(false);
  }

  const columns: ColumnsType<Repository> = [
    {
      dataIndex: 'name',
      title: 'Repositório',
    },
    {
      dataIndex: 'language',
      title: 'Linguages',
      render: (language) => (
        <Tag color={LANGUAGES_COLOR[language]}>{language}</Tag>
      ),
    },
    {
      dataIndex: 'owner',
      title: 'Responsável',
      render: (owner) => (
        <a href={owner.url}>
          <Avatar
            src={owner.avatar_url}
            size={20}
            style={{ marginRight: 10 }}
          />
          <span>{owner.login}</span>
        </a>
      ),
    },
    {
      dataIndex: 'stargazers_count',
      title: 'Stars',
      align: 'right',
      render: (stars) => (
        <>
          {stars} <StarOutlined />
        </>
      ),
    },
    {
      dataIndex: 'open_issues_count',
      title: 'Total de issues',
      align: 'right',
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={repositories}
        rowKey={(item) => item.id}
      />
    </div>
  );
}

export default RepositoryListPage;
