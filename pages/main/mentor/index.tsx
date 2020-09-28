import React, { useEffect, useState } from 'react';
import MainLayout from '../../../components/MainLayout';
import { Button, Form, Input, Space, Typography } from 'antd';
import SubmitTasks from './submit';
import StudentList from '../../../components/StudentsList/index';
import { db } from '../../../firebase';
import Work from '../../../components/Work';
import { Role } from '../../../interfaces/IUser';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const userData = {
  uid: '1',
  githubAddress: 'string',
  name: 'Petrov',
  role: Role.mentor,
  students: ['', ''],
  // {
  //   id: '41iPtdzIYHV5XxwnXRgOm1Nr14H3',
  //   githubAddress: 'string',
  //   name: 'Petrov',
  //   rank: 'student',
  //   tasksID: [
  //     { taskID: 1, taskName: 'Task1' },
  //     { taskID: 2, taskName: 'Task2' },
  //     { taskID: 3, taskName: 'Task3' },
  //   ],
  // },
  // {
  //   id: '5iwVTjafzVayLNusWyaxqbaTB6u1',
  //   githubAddress: 'string',
  //   name: 'Ivanov',
  //   rank: 'student',
  //   tasksID: [
  //     { taskID: 1, taskName: 'Task4' },
  //     { taskID: 2, taskName: 'Task5' },
  //     { taskID: 3, taskName: 'Task6' },
  //   ],
  // },
  // {
  //   id: 'sZvSHsJdnRQyaNkAERz9eaj0ra03',
  //   githubAddress: 'string',
  //   name: 'Sidorov',
  //   rank: 'student',
  //   tasksID: [
  //     { taskID: 1, taskName: 'Task7' },
  //     { taskID: 2, taskName: 'Task8' },
  //     { taskID: 3, taskName: 'Task9' },
  //   ],
  //   // },
  // ],
};
interface PropsMentorPage {
  data: [];
}

const MentorPage: React.FC<PropsMentorPage> = ({ data }) => {
  const { Title, Link, Text } = Typography;
  const [task, setTask] = useState();
  useEffect(() => {
    console.log('ren');
  }, [task]);
  const getTask = (value: any) => {
    setTask(value);
  };

  return (
    <MainLayout title={'main: mentor'}>
      <Title level={1}>Mentor Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          {/*    <Title level={2}>Mentor</Title>
          <SubmitTasks /> */}
          <StudentList user={userData} getTask={getTask} data={data} />
        </div>
        <div className="workspace">
          <h1>Working Space</h1>
          {task ? <Work task={task} /> : null}
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
export default MentorPage;
