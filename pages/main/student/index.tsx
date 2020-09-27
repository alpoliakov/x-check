import React, { useState } from 'react';
import { Typography } from 'antd';
import Tasks from './tasks';
import { db } from '../../../firebase';
import MainLayout from '../../../components/MainLayout';
import Myform from '../../../components/Form';

interface PropsStudentPage {
  data?: [];
  data2?: [];
}

const StudentPage: React.FC<PropsStudentPage> = ({ data }) => {
  const { Title } = Typography;

  const [toUsers, setToUsers] = useState(false);
  const [toTasks, setToTasks] = useState(false);
  const [toNewTask, setToNewTask] = useState(false);
  const goToUsers = () => {
    setToUsers(!toUsers);
  };
  const goToNewTask = () => {
    setToNewTask(true);
  };
  const goToTasks = () => {
    setToTasks(!toTasks);
  };

  return (
    <MainLayout title={'main: student'}>
      <Title level={1}>Student Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
            <Title level={2}>Student</Title>
            <a onClick={goToUsers}>Users</a>
            <div>
              <a onClick={goToTasks}>Tasks</a>
              <br />
              <a onClick={goToNewTask}>Create task</a>
            </div>
          </div>
        </div>
        <div className="workspace">
          <h1>Working Space</h1>
          {toTasks && <Tasks data2={data2} />}
          {toNewTask && <Myform />}
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

//export const getServerSideProps2 = async () => {
let data2: any | undefined = [];
//  await db
db.collection('tasks')
  .get()
  .then((snap) => {
    data2 = snap.docs.map((doc) => doc.data());
  });
//  return {
//    props: { data2 },
//  };
//};

export default StudentPage;
