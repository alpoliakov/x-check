import React from 'react';
import MainLayout from '../../components/MainLayout';
import AdminMain from '../../components/Admin/AdminMain';

interface PropsAdmin {
  changeAuthorization: () => void;
}

const AdminPage: React.FC<PropsAdmin> = ({ changeAuthorization }) => {
  return (
    <>
      <MainLayout title="Admin" changeAuthorization={changeAuthorization}>
        <AdminMain />
      </MainLayout>
    </>
  );
};

export default AdminPage;
