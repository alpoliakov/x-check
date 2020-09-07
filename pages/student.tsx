import React from 'react';
import MainLayout from '../components/MainLayout';

interface PropsStudent {
  changeAuthorization: () => void;
}

const StudentPage: React.FC<PropsStudent> = ({ changeAuthorization }) => {
  return (
    <>
      <MainLayout title="Student" changeAuthorization={changeAuthorization}>
        <h1>Student Page</h1>
      </MainLayout>
    </>
  );
};

export default StudentPage;
