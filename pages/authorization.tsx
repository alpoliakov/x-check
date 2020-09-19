import React, { useState } from 'react';
import RequestAuth from './auth/request';
import Login from './auth/login';
import Register from './auth/register';
import GitHubSignUp from './auth/github';

interface Props {
  changeAuthorization: () => void;
}

const AuthPage: React.FC<Props> = ({ changeAuthorization }) => {
  const changeAuthPage = (namePage: string): void => {
    setStateAuth(namePage);
  };
  const [stateAuth, setStateAuth] = useState('');

  // @ts-ignore
  return (
    <>
      {stateAuth === '' && (
        <RequestAuth changeAuthPage={changeAuthPage} changeAuthorization={changeAuthorization} />
      )}
      {stateAuth === 'login' && <Login changeAuthPage={changeAuthPage} />}
      {stateAuth === 'register' && (
        <Register changeAuthPage={changeAuthPage} changeAuthorization={changeAuthorization} />
      )}
      {stateAuth === 'github' && <GitHubSignUp changeAuthPage={changeAuthPage} />}
    </>
  );
};

export default AuthPage;
