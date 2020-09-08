import React from 'react';
import StudentPage from './student';
import AuthorPage from './author';
import MainLayout from '../components/MainLayout';

interface PropsMainPage {
  role: string;
  changeAuthorization: () => void;
}
const MainPages: React.FC<PropsMainPage> = ({ role, changeAuthorization }) => {
  return (
    <>
      {role === 'student' && <StudentPage changeAuthorization={changeAuthorization} />}
      {role === 'author' && <AuthorPage changeAuthorization={changeAuthorization} />}
    </>
  );
};

export default MainPages;
