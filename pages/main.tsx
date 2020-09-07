import React from 'react';
import StudentPage from './student';
import AdminPage from './admin';
import MainLayout from '../components/MainLayout';

interface PropsMainPage {
  role: string;
  changeAuthorization: () => void;
}
const MainPages: React.FC<PropsMainPage> = ({ role, changeAuthorization }) => {
  return (
    <>
      {role === 'student' && <StudentPage changeAuthorization={changeAuthorization} />}
      {role === 'admin' && <AdminPage changeAuthorization={changeAuthorization} />}
    </>
  );
};

export default MainPages;
