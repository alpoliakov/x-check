import React from 'react';
import MainLayout from '../../../components/MainLayout';
import { Typography } from 'antd';

interface PropsManager {}

const ManagerPage = () => {
  const { Title, Link, Text } = Typography;
  return (
    <MainLayout title={'main: manager'}>
      <Title level={1}>Course Manager Page</Title>
    </MainLayout>
  );
};

export default ManagerPage;
