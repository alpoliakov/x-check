import React from 'react';
import { List, Typography } from 'antd';
import { db } from '../../../firebase';
import MainLayout from '../../../components/MainLayout';
import Link from 'next/link';

interface PropsStudentPage {
  data?: [];
}

const StudentPage: React.FC<PropsStudentPage> = ({ data }) => {
  const { Title } = Typography;
  console.log(data);
  const dataTest: Array<string> = ['Cross-check', 'Tasks'];

  return (
    <MainLayout title={'main: student'}>
      <Title level={1}>Student Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
            <Title level={2}>Student</Title>
            <List
              bordered
              dataSource={dataTest}
              renderItem={(item) => (
                <List.Item key={item}>
                  <Link href={`./student/${item.toLowerCase()}`}>
                    <a>{item}</a>
                  </Link>
                </List.Item>
              )}
            />
          </div>
        </div>
        <div className="workspace"></div>
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
