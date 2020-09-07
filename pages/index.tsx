import React, { useState } from 'react';
import AuthPage from './authorization';
import MainPages from './main';
import { GetServerSideProps } from 'next';
import { checkRef } from '../firebase';

interface PropsHome {
  roleUser: string;
}

const Home: React.FC<PropsHome> = ({ roleUser }) => {
  const [authorization, setAuthorization] = useState(false);
  const [role, setRole] = useState(roleUser);
  const changeAuthorization = () => {
    setAuthorization(!authorization);
  };

  return (
    <>
      {authorization ? (
        <MainPages role={role} changeAuthorization={changeAuthorization} />
      ) : (
        <AuthPage changeAuthorization={changeAuthorization} />
      )}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<PropsHome> = async () => {
  let role = '';
  checkRef.on('value', (snapshot) => {
    role = snapshot.val();
  });
  return {
    props: {
      roleUser: role || 'student',
    },
  };
};
