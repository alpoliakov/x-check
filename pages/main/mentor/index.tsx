import React from 'react';
import MainLayout from '../../../components/MainLayout';
import { Typography } from 'antd';

const MentorPage = () => {
  const { Title, Link, Text } = Typography;
  return (
    <MainLayout title={'main: mentor'}>
      <Title level={1}>Mentor Page</Title>
    </MainLayout>
  );
};

export default MentorPage;
