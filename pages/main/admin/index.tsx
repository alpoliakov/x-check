import React, { useState } from 'react';
import { Button, Row, Typography } from 'antd';
import MainLayout from '../../../components/MainLayout';
import SubmitRandom from './submit-random';
import { db } from '../../../firebase';
import AdminMain from '../../../components/Admin/index';

interface PropsAdmin {
  dataUsers: [];
  dataTasks: [];
  crossCheckSession: [];
}

const AdminPage: React.FC<PropsAdmin> = ({ dataUsers, dataTasks, crossCheckSession }) => {
  const { Title } = Typography;
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const showModal = () => {
    console.log(visibleModal);
    setVisibleModal(true);
  };
  const getVisibleModal = (value: boolean) => {
    setVisibleModal(value);
  };
  return (
    <MainLayout title={'main: admin'}>
      <Title level={1}>Admin Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
            {/*    <Title level={2}>Admin</Title>
            <SubmitRandom /> */}
            <Row>
              <Button type="primary" style={{ width: 150, marginTop: 20 }}>
                Creat task
              </Button>
            </Row>
            <Row>
              <Button type="primary" style={{ width: 150, marginTop: 20 }} onClick={showModal}>
                Start new task
              </Button>
            </Row>
          </div>
        </div>
        <div className="workspace">
          <AdminMain
            getVisibleModal={getVisibleModal}
            visibleModal={visibleModal}
            dataTasks={dataTasks}
            dataUsers={dataUsers}
            crossCheckSession={crossCheckSession}
          />
        </div>
      </main>
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  let dataUsers: any | undefined = [];
  let dataTasks: any | undefined = [];
  let crossCheckSession: any | undefined = [];
  await db
    .collection('users')
    .get()
    .then((snap) => {
      dataUsers = snap.docs.map((doc) => doc.data());
    });
  await db
    .collection('tasks')
    .get()
    .then((snap) => {
      dataTasks = snap.docs.map((doc) => doc.data());
    });
  await db
    .collection('crossCheckSession')
    .get()
    .then((snap) => {
      crossCheckSession = snap.docs.map((doc) => doc.data());
    });
  return {
    props: { dataUsers, dataTasks, crossCheckSession },
  };
};
export default AdminPage;
