import React from 'react';
import MainLayout from '../components/MainLayout';

interface PropsAdmin {
  changeAuthorization: () => void;
}

const AuthorPage: React.FC<PropsAdmin> = ({ changeAuthorization }) => {
  return (
    <>
      <MainLayout title="Admin" changeAuthorization={changeAuthorization}>
        <h1>Author Page</h1>
      </MainLayout>
    </>
  );
};

export default AuthorPage;
