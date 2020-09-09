import React from 'react';
import StudentPage from './roles/student';
import AdminPage from './roles/admin';
import MainLayout from '../components/MainLayout';
import MentorPage from './roles/mentor';
import ManagerPage from './roles/manager';

interface PropsMainPage {
  role: string;
  changeAuthorization: () => void;
}
const MainPages: React.FC<PropsMainPage> = ({ role, changeAuthorization }) => {
  return (
    <>
      {role === 'student' && <StudentPage changeAuthorization={changeAuthorization} />}
      {role === 'admin' && <AdminPage changeAuthorization={changeAuthorization} />}
      {role === 'mentor' && <MentorPage changeAuthorization={changeAuthorization} />}
      {role === 'manager' && <ManagerPage changeAuthorization={changeAuthorization} />}
    </>
  );
};

export default MainPages;
