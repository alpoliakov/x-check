import React from 'react';
import { Typography } from 'antd';
import MainLayout from '../../../components/MainLayout';

interface PropsAdmin {}

const AdminPage: React.FC<PropsAdmin> = () => {
  const { Title, Link, Text } = Typography;
  return (
    <MainLayout title={'main: admin'}>
      <Title level={1}>Admin Page</Title>
    </MainLayout>
  );
};

export default AdminPage;
