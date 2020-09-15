import React, { useState, useEffect } from 'react';
import StudentPage from './roles/student';
import AdminPage from './roles/admin';
import MentorPage from './roles/mentor';
import ManagerPage from './roles/manager';
import Error from './error';
import { auth, checkRef } from '../firebase';
import MainLayout from '../components/MainLayout';
import { Select } from 'antd';
import { useRouter } from 'next/router';
import { Typography } from 'antd';

interface PropsMainPage {
  role: string;
  changeAuthorization: () => void;
}

const useRequest = () => {
  const [userData, setUserData] = useState({ roles: [] });
  const getUserData = () => {
    checkRef.on('value', (snapshot) => {
      let users = snapshot.val();
      for (let key in users) {
        // @ts-ignore
        if (users[key].uid === auth.currentUser.uid) {
          setUserData(users[key]);
        }
      }
    });
  };
  return [userData, getUserData];
};

const MainPages: React.FC<PropsMainPage> = ({ changeAuthorization }) => {
  const { Title, Link, Text } = Typography;
  const { Option } = Select;
  const [currentRole, setCurrentRole] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const [userData, getUserData] = useRequest();

  const subscribe = auth.onAuthStateChanged((user): void => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const onChange = (value: string) => {
    setCurrentRole(value);
  };

  // @ts-ignore
  const { roles } = userData;

  useEffect(() => {
    if (loggedIn) {
      // @ts-ignore
      getUserData();
      setCurrentRole(currentRole);
    }
    subscribe();
  }, [loggedIn, currentRole]);

  return (
    <MainLayout title={`main: ${currentRole}`} changeAuthorization={changeAuthorization}>
      <section className={'select_role'}>
        <Select
          showSearch
          defaultValue={''}
          style={{ width: 200 }}
          placeholder={roles.length !== 0 ? 'Select a role' : 'Loading...'}
          optionFilterProp="children"
          onChange={onChange}
        >
          <Option value={''}>choice a role</Option>
          {roles.map((item: string) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </section>
      <section className={'box-roles'}>
        {currentRole === '' && <Title level={1}>Choice a role</Title>}
        {currentRole === 'student' && <StudentPage />}
        {currentRole === 'admin' && <AdminPage />}
        {currentRole === 'mentor' && <MentorPage />}
        {currentRole === 'manager' && <ManagerPage />}
        {currentRole === 'error' && <Error />}
      </section>
    </MainLayout>
  );
};

export default MainPages;
