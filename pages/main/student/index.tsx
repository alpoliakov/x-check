import React, { useState } from 'react';
import { Typography } from 'antd';
import Users from './users';
import { db } from '../../../firebase';
import MainLayout from '../../../components/MainLayout';

interface PropsStudentPage {
  data?: [];
}

const StudentPage: React.FC<PropsStudentPage> = ({ data }) => {
  const { Title } = Typography;
  const [toUsers, setToUsers] = useState(false);
  const goToUsers = () => {
    setToUsers(!toUsers);
  };

  return (
    <MainLayout title={'main: student'}>
      <Title level={1}>Student Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
            <Title level={2}>Student</Title>
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

export const getServerSideProps = async () => {
  let data: any | undefined = [];
  await db
    .collection('users')
    .get()
    .then((snap) => {
      data = snap.docs.map((doc) => doc.data());
    });
  return {
    props: { data },
  };
};

export default StudentPage;
