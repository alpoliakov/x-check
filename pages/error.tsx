import React from 'react';
import MainLayout from '../components/MainLayout';
import { Result, Button } from 'antd';
import { auth } from '../firebase';
import { useRouter } from 'next/router';

const Error = () => {
  const router = useRouter();
  const logOut = () => {
    auth.signOut().then(
      function () {
        console.log('Logged out!');
      },
      function (error) {
        console.log(`${error.code}  - ${error.message}`);
      }
    );
    router.push('/');
  };

  return (
    <>
      <main>
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Button type="primary" onClick={logOut}>
              Back Home
            </Button>
          }
        />
        ,
      </main>
    </>
  );
};

export default Error;
