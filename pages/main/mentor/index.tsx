import React, { useEffect, useState } from 'react';
import MainLayout from '../../../components/MainLayout';
import { Button, Form, Input, Space, Typography } from 'antd';
import SubmitTasks from './submit';
import StudentList from '../../../components/Mentor/StudentsList/index';
import { auth, db } from '../../../firebase';
import Work from '../../../components/Work';
import { Role } from '../../../interfaces/IUser';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import AddStudents from '../../../components/Mentor/StudentsList/AddStudents';

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
  userData: [];
}

const MentorPage: React.FC<PropsMentorPage> = ({ userData }) => {
  const { Title, Link, Text } = Typography;
  const [task, setTask] = useState();
  const [myUid, setMyUid] = useState<any>();
  useEffect(() => {
    const waitForCurrentUser = setInterval(() => {
      // @ts-ignore
      const uid = auth.currentUser;
      if (uid !== null) {
        clearInterval(waitForCurrentUser);
        const myuid = uid.uid;
        setMyUid(myuid);
        return uid;
      } else {
        console.log('Wait for it');
      }
    }, 300);
  }, []);

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
          {/* <AddStudents users={userData} myUid={myUid} /> */}
          <StudentList user={userData} myUid={myUid} getTask={getTask} />
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
  let userData: any | undefined = [];
  await db
    .collection('users')
    .get()
    .then((snap) => {
      userData = snap.docs.map((doc) => doc.data());
    });

  return {
    props: { userData },
  };
};
export default MentorPage;
