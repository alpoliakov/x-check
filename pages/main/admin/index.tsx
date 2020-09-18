import React from 'react';
import { Typography } from 'antd';
import MainLayout from '../../../components/MainLayout';

interface PropsAdmin {}

const AdminPage: React.FC<PropsAdmin> = () => {
  const { Title } = Typography;
  return (
    <MainLayout title={'main: admin'}>
      <Title level={1}>Admin Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
            <Title level={2}>Admin</Title>
          </div>
        </div>
        <div className="workspace">
          <h1>Working Space</h1>
        </div>
      </main>
    </MainLayout>
  );
};

export default AdminPage;
