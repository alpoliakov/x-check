import React, { useEffect, useState } from 'react';
import AuthPage from './authorization';
import MainPages from './main';
import { GetServerSideProps } from 'next';
import { checkRef, auth } from '../firebase';

interface PropsIP {
  roleUser: string;
}

const IndexPage: React.FC<PropsIP> = ({ roleUser }) => {
  const [authorization, setAuthorization] = useState(false);
  const [role, setRole] = useState(roleUser);
  useEffect(() => {
    setRole(roleUser);
  }, [roleUser]);
  const changeAuthorization = () => {
    setAuthorization(!authorization);
  };
  const changeRole = (data: string) => {
    setRole(data);
  };

  return (
    <>
      {authorization ? (
        <MainPages role={role} changeAuthorization={changeAuthorization} />
      ) : (
        <AuthPage changeRole={changeRole} changeAuthorization={changeAuthorization} />
      )}
    </>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<PropsIP> = async () => {
  let role = '';
  checkRef.on('value', (snapshot) => {
    const data = snapshot.val();
    for (let key in data) {
      // @ts-ignore
      if (data[key].uid === auth.currentUser.uid) {
        role = data[key].nickname;
      }
    }
  });
  return {
    props: {
      roleUser: role || 'error',
    },
  };
};
