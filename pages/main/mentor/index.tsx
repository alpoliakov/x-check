import React from 'react';
import MainLayout from '../../../components/MainLayout';
import { Typography } from 'antd';
import SubmitTasks from './submit';

const MentorPage = () => {
  const { Title, Link, Text } = Typography;
  return (
    <MainLayout title={'main: mentor'}>
      <Title level={1}>Mentor Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <Title level={2}>Mentor</Title>
          <SubmitTasks />
        </div>
        <div className="workspace">
          <h1>Working Space</h1>
        </div>
      </main>
    </MainLayout>
  );
};

export default MentorPage;
