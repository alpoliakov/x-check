import React, { useState } from 'react';
import { Button, Modal, Row, Typography } from 'antd';
import MainLayout from '../../../components/MainLayout';
import SubmitRandom from './submit-random';
import { db } from '../../../firebase';
import AdminMain from '../../../components/Admin/index';
import Form from '../../../components/Form';
import TableData from '../../../components/TableData';
import Import from '../../../components/Import';

interface PropsAdmin {
  dataUsers: [];
  dataTasks: [];
  crossCheckSession: [];
  dataRow?: [];
  dataSession: [];
}

const AdminPage: React.FC<PropsAdmin> = ({
  dataUsers,
  dataTasks,
  crossCheckSession,
  dataRow,
  dataSession,
}) => {
  const { Title } = Typography;
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [visibleImport, setVisibleImport] = useState<boolean>(false);
  const [visitableCreateTask, setVisitableCreateTask] = useState(false);
  const [visitableTable, setVisitableTable] = useState(false);

  const showModalCreateTask = () => {
    setVisitableCreateTask(true);
  };

  const showTable = () => {
    setVisitableTable(true);
  };
  const showImport = () => {
    setVisibleImport(true);
  };
  const showModal = () => {
    setVisibleModal(true);
  };
  const getVisibleModal = (value: boolean) => {
    setVisibleModal(value);
  };
  const handleOk = (e: any) => {
    setVisitableCreateTask(false);
  };
  const handleOkImport = (e: any) => {
    setVisibleImport(false);
  };
  const handleOkTable = (e: any) => {
    setVisitableTable(false);
  };
  const task = {};
  return (
    <MainLayout title={'main: admin'}>
      <Title level={1}>Admin Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
            {/*    <Title level={2}>Admin</Title>
            <SubmitRandom /> */}
            <Row>
              <Button
                type="primary"
                style={{ width: 150, marginTop: 20 }}
                onClick={showModalCreateTask}
              >
                Create task
              </Button>
            </Row>
            <Row>
              <Button type="primary" style={{ width: 150, marginTop: 20 }} onClick={showImport}>
                Import/Export
              </Button>
            </Row>
            <Row>
              <Button type="primary" style={{ width: 150, marginTop: 20 }} onClick={showModal}>
                Start new task
              </Button>
            </Row>
            <Row>
              <Button type="primary" style={{ width: 150, marginTop: 20 }} onClick={showTable}>
                Table results
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
            dataSession={dataSession}
          />
          <Modal
            width={'1200px'}
            onCancel={handleOkImport}
            visible={visibleImport}
            onOk={handleOkImport}
          >
            <Import dataTasks={dataTasks} />
          </Modal>
          <Modal
            title="Create tasks"
            width={'auto'}
            onCancel={() => setVisitableCreateTask(false)}
            visible={visitableCreateTask}
            onOk={handleOk}
          >
            <Form task={task} />
          </Modal>
          <Modal
            title="Table tasks"
            width={'auto'}
            onCancel={() => setVisitableTable(false)}
            visible={visitableTable}
            onOk={handleOkTable}
          >
            {/* dataRow={dataRow} */}
            <TableData />
          </Modal>
        </div>
      </main>
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  let dataUsers: any | undefined = [];
  let dataTasks: any | undefined = [];
  let crossCheckSession: any | undefined = [];
  // let courseUser: any | undefined = [];
  // let courseCrossCheckTasks: any | undefined = [];
  let dataSession: any | undefined = [];
  await db
    .collection('sessions')
    .get()
    .then((snap) => {
      dataSession = snap.docs.map((doc) => doc.data());
    });

  await db
    .collection('users')
    .get()
    .then((snap) => {
      dataUsers = snap.docs.map((doc) => doc.data());
      // courseUser = data.filter((user) => user.course.includes(activeCourse));
    });
  await db
    .collection('TasksArray')
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

  /*   await db
    .collection('course')
    .get()
    .then((snap) => {
      courseCrossCheckTasks = snap.docs
        .map((doc) => doc.data())
        .filter((el) => el.name === activeCourse)[0]
        .map((task) => task.checkingType === 'crossCheck');
    }); */

  const courseUser = [
    {
      location: 'unknown',
      login: 'mariariazanova',
      avatar_url: 'https://avatars3.githubusercontent.com/u/57406080?v=4',
      html_url: 'https://github.com/mariariazanova',
      nickname: 'mariariazanova',
      email: 'mv_13@mail.ru',
      password: 'ZZzz1122',
      uid: '41iPtdzIYHV5XxwnXRgOm1Nr14H3',
      roles: ['student', 'mentor', 'admin', 'manager'],
      name: 'Maria Riazanova',
      task: {
        scores: [
          { reviewer: 'egor', score: '0' },
          { reviewer: 'stas', score: '12' },
        ],
        id: 'utuygj',
      },
      task1: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'eryrytr',
      },
    },
    {
      html_url: 'https://github.com/alpoliakov',
      nickname: 'alpoliakov',
      roles: ['student', 'admin', 'mentor', 'manager'],
      location: 'Kyiv',
      avatar_url: 'https://avatars1.githubusercontent.com/u/27024108?v=4',
      name: 'Aleksandr Poliakov',
      login: 'alpoliakov',
      email: 'alpoliakov73@gmail.com',
      uid: '5iwVTjafzVayLNusWyaxqbaTB6u1',
      task: {
        scores: [
          { reviewer: 'egor', score: '15' },
          { reviewer: 'stas', score: '1' },
        ],
        id: 'qwqeq',
      },
      task1: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'tertry',
      },
    },
    {
      html_url: 'https://github.com/cup0ra',
      uid: 'JpeOZBnDFOdWFnny8B2to58DKNg1',
      name: 'sergey',
      login: 'cup0ra',
      avatar_url: 'https://avatars1.githubusercontent.com/u/57291691?v=4',
      roles: ['student', 'admin', 'mentor', 'manager'],
      nickname: 'cup0ra',
      email: null,
      location: null,
      task: {
        scores: [
          { reviewer: 'egor', score: '100' },
          { reviewer: 'stas', score: '19' },
        ],
        id: 'jgugu',
      },
      task1: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'hrthtrh',
      },
    },
    {
      name: null,
      email: null,
      roles: ['student', 'admin', 'mentor', 'manager'],
      nickname: 'SLatyankov',
      uid: 'Q3npcG2fnxbOPrnunZNnbp92Zdz2',
      avatar_url: 'https://avatars1.githubusercontent.com/u/47479375?v=4',
      login: 'SLatyankov',
      html_url: 'https://github.com/SLatyankov',
      location: null,
      task: {
        scores: [
          { reviewer: 'egor', score: '55' },
          { reviewer: 'stas', score: '13' },
        ],
        id: 'adada',
      },
      task1: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'qrsdsgd',
      },
    },
    {
      nickname: 'igorzima',
      location: null,
      login: 'igorzima',
      roles: ['student', 'admin', 'mentor', 'manager'],
      avatar_url: 'https://avatars0.githubusercontent.com/u/49781540?v=4',
      name: 'Ihar Zimnitski',
      uid: 'sZvSHsJdnRQyaNkAERz9eaj0ra03',
      email: null,
      html_url: 'https://github.com/igorzima',
      task: {
        scores: [
          { reviewer: 'egor', score: '35' },
          { reviewer: 'stas', score: '40' },
        ],
        id: 'kuitiu',
      },
      task1: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'qrwrew',
      },
    },
    {
      roles: ['student', 'mentor', 'admin', 'manager'],
      login: 'GameBoy',
      email: 'alpoliakov@gmail.com',
      uid: 'xfsmOXqeFjd8ZpbnocMt3Qh1y3K3',
      html_url: 'https://github.com/GameBoy',
      name: 'Game Boy',
      password: '123456',
      location: 'unknown',
      nickname: 'Gameboy',
      avatar_url: 'https://avatars0.githubusercontent.com/u/38436537?v=4',
      task: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'vbnvnb',
      },
      task1: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'fsfe',
      },
    },
  ];

  const courseCrossCheckTasks = [
    {
      id: 'task',
      name: 'task',
      checkingType: 'crossCheck',
    },
    {
      id: 'task1',
      name: 'task1',
      checkingType: 'not crossCheck',
    },
    {
      id: 'task2',
      name: 'task2',
      checkingType: 'crossCheck',
    },
    {
      id: 'task3',
      name: 'task3',
      checkingType: 'not crossCheck',
    },
  ];

  // const dataRow = courseCrossCheckTasks
  //   .filter((task) => task.checkingType === 'crossCheck')
  //   .map((taskName) =>
  //     courseUser
  //       .filter((user) => user[taskName.name])
  //       .map((user, index) => ({
  //         key: index,
  //         user: user.nickname,
  //         task: taskName.name,
  //         reviewer: 'ant',
  //         score: 0,
  //       }))
  //   )
  //   .flat(Infinity);

  const dataRow = [
    {
      key: '1',
      user: 'Mike',
      task: '32',
      reviewer: 'Stas',
    },
    {
      key: '2',
      user: 'John',
      task: 42,
      reviewer: '10 Downing Street',
    },
  ];

  return {
    props: { dataUsers, dataTasks, crossCheckSession, dataRow, dataSession },
  };
};
export default AdminPage;
