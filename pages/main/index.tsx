import React, { useState, useEffect } from 'react';
import StudentPage from './student';
import AdminPage from './admin';
import MentorPage from './mentor';
import ManagerPage from './manager';
import Error from '../error';
import { auth, checkRef } from '../../firebase';
import MainLayout from '../../components/MainLayout';
import { Select } from 'antd';
import { Typography } from 'antd';
import { useRouter } from 'next/router';

interface PropsMainPage {
  role: string;
  changeAuthorization: () => void;
}

const MainPages: React.FC<PropsMainPage> = ({ changeAuthorization }) => {
  const { Title } = Typography;
  const router = useRouter();
  return (
    <>
      <MainLayout title={`main: choice a role`} changeAuthorization={changeAuthorization}>
        <section className={'box-roles'}>
          <Title level={1}>Choice a role</Title>
          {/*{currentRole === 'student' && <StudentPage />}*/}
          {/*{currentRole === 'admin' && <AdminPage />}*/}
          {/*{currentRole === 'mentor' && <MentorPage />}*/}
          {/*{currentRole === 'manager' && <ManagerPage />}*/}
          {/*{currentRole === 'error' && <Error />}*/}
        </section>
      </MainLayout>
    </>
  );
};

export default MainPages;
