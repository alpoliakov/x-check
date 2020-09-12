import React from 'react';
import StudentPage from './student/student';
import AdminPage from './roles/admin';
import MentorPage from './roles/mentor';
import ManagerPage from './roles/manager';
import Error from './error';

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
      {role === 'error' && <Error changeAuthorization={changeAuthorization} />}
    </>
  );
};

export default MainPages;
