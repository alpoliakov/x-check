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

interface PropsMainPage {
  role: string;
  changeAuthorization: () => void;
}

const MainPages: React.FC<PropsMainPage> = ({ changeAuthorization }) => {
  const { Option } = Select;
  const [currentRole, setCurrentRole] = useState('');
  const [userData, setUserData] = useState({ roles: [] });
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const subscribe = auth.onAuthStateChanged((user): void => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  console.log(currentRole);

  const onChange = (value: string) => {
    setCurrentRole(value);
    // changeRole(value);
  };

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
  const { roles } = userData;
  useEffect(() => {
    if (loggedIn) {
      getUserData();
      setCurrentRole(currentRole);
    }
    subscribe();
  }, [loggedIn, currentRole]);

  return (
    <MainLayout title={`Main: ${currentRole}`} changeAuthorization={changeAuthorization}>
      <section>
        <Select
          showSearch
          defaultValue={''}
          style={{ width: 200 }}
          placeholder={roles.length !== 0 ? 'Select a role' : 'Loading...'}
          optionFilterProp="children"
          onChange={onChange}
        >
          <Option value={''}>choice a role</Option>
          {roles.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </section>
      <section>
        {currentRole === '' && <h2>Choice a role</h2>}
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
