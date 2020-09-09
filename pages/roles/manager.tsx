import React from 'react';
import MainLayout from '../../components/MainLayout';

interface PropsManager {
  changeAuthorization: () => void;
}

const ManagerPage: React.FC<PropsManager> = ({ changeAuthorization }) => {
  return (
    <>
      <MainLayout title="Course Manager" changeAuthorization={changeAuthorization}>
        <h1>Course Manager Page</h1>
      </MainLayout>
    </>
  );
};

export default ManagerPage;
