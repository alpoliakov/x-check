import React from 'react';
import MainLayout from '../../../components/MainLayout';
import { Typography } from 'antd';
import { db } from '../../../firebase';

interface PropsManager {}

const ManagerPage = () => {
  const { Title, Link, Text } = Typography;
  return (
    <MainLayout title={'main: manager'}>
      <Title level={1}>Course Manager Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
            <Title level={2}>Manager</Title>
          </div>
        </div>
        <div className="workspace">
          <h1>Working Space</h1>
        </div>
      </main>
    </MainLayout>
  );
};

export default ManagerPage;
