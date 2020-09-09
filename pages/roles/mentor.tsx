import React from 'react';
import MainLayout from '../../components/MainLayout';

interface PropsMentor {
  changeAuthorization: () => void;
}

const MentorPage: React.FC<PropsMentor> = ({ changeAuthorization }) => {
  return (
    <>
      <MainLayout title="Mentor" changeAuthorization={changeAuthorization}>
        <h1>Mentor Page</h1>
      </MainLayout>
    </>
  );
};

export default MentorPage;
