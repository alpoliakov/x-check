import React from 'react';
import MainLayout from '../components/MainLayout';

interface PropsAdmin {
  changeAuthorization: () => void;
}

const AdminPage: React.FC<PropsAdmin> = ({ changeAuthorization }) => {
  return (
    <>
      <MainLayout title="Admin" changeAuthorization={changeAuthorization}>
        <h1>Admin Page</h1>
      </MainLayout>
    </>
  );
};

export default AdminPage;
