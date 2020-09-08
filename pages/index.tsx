import React, { useState } from 'react';
import AuthPage from './authorization';
import MainPages from './main';
import { GetServerSideProps } from 'next';
import { checkRef } from '../firebase';

interface PropsIP {
  roleUser: string;
}

const IndexPage: React.FC<PropsIP> = ({ roleUser }) => {
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

export default IndexPage;

export const getServerSideProps: GetServerSideProps<PropsIP> = async () => {
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
