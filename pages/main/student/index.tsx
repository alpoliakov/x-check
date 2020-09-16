import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import Link from 'next/link';
import Users from './users';
import { checkRef } from '../../../firebase';
import { NextPage } from 'next';
import MainLayout from '../../../components/MainLayout';

interface PropsStudentPage {
  data?: [];
}

const StudentPage: React.FC<PropsStudentPage> = ({ data }) => {
  const { Title, Text } = Typography;
  const [toUsers, setToUsers] = useState(false);
  const goToUsers = () => {
    setToUsers(!toUsers);
  };

  return (
    <MainLayout title={'main: student'}>
      <Title level={1}>Student Page</Title>
      <main className={'main__box'}>
        <div className="nav__student">
          <div>
            <a onClick={goToUsers}>Users</a>
          </div>
        </div>
        <div className="workspace">
          <h1>Working Space</h1>
          {toUsers && <Users data={data} />}
        </div>
      </main>
    </MainLayout>
  );
};

// @ts-ignore
StudentPage.getInitialProps = async (ctx) => {
  let data: any[] = [];
  await checkRef.on('value', (snapshot) => {
    const items = snapshot.val();
    for (let key in items) {
      data.push(items[key]);
    }
  });
  return { data: data };
};

export default StudentPage;
