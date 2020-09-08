import React, { useState } from 'react';
import { FormOutlined, LoginOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useRouter } from 'next/router';
import RequestAuth from './users/request';
import Login from './users/login';
import Register from './users/register';

interface Props {
  changeAuthorization: () => void;
  changeRole: (data: string) => void;
}

const AuthPage: React.FC<Props> = ({ changeAuthorization, changeRole }) => {
  const router = useRouter();
  const changeAuthPage = (namePage: string): void => {
    setStateAuth(namePage);
  };
  const [stateAuth, setStateAuth] = useState('');

  return (
    <>
      {stateAuth === '' && <RequestAuth changeAuthPage={changeAuthPage} />}
      {stateAuth === 'login' && <Login changeAuthPage={changeAuthPage} changeRole={changeRole} />}
      {stateAuth === 'register' && (
        <Register
          changeAuthPage={changeAuthPage}
          changeRole={changeRole}
          changeAuthorization={changeAuthorization}
        />
      )}
    </>
  );
};

export default AuthPage;
