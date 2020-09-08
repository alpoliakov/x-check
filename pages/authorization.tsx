import React, { useState } from 'react';
import { FormOutlined, LoginOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useRouter } from 'next/router';
import RequestAuth from './users/request';
import Login from './users/login';
import Register from './users/register';

interface Props {
  changeAuthorization: () => void;
}

const AuthPage: React.FC<Props> = ({ changeAuthorization }) => {
  const router = useRouter();
  const changeAuthPage = (namePage: string): void => {
    setStateAuth(namePage);
  };
  const [stateAuth, setStateAuth] = useState('');

  return (
    <>
      {stateAuth === '' && <RequestAuth changeAuthPage={changeAuthPage} />}
      {stateAuth === 'login' && <Login changeAuthPage={changeAuthPage} />}
      {stateAuth === 'register' && <Register changeAuthPage={changeAuthPage} />}
    </>
  );
};

export default AuthPage;
