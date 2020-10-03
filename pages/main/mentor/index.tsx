import React, { useEffect, useState } from 'react';
import MainLayout from '../../../components/MainLayout';
import { Button, Form, Input, Space, Typography } from 'antd';
import SubmitTasks from './submit';
import StudentList from '../../../components/Mentor/StudentsList/index';
import { auth, db } from '../../../firebase';
import MentorCheck from '../../../components/Mentor/mentor-check';
import { Role, UserBasic } from '../../../interfaces/IUser';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import AddStudents from '../../../components/Mentor/StudentsList/AddStudents';
import { ITask } from '../../../interfaces/ITask';
import { ICourse } from '../../../interfaces/ICourse';
import { ICheсk, IWorkDone } from '../../../interfaces/IWorkDone';
import { setDocument, updateObjectField } from '../../../services/updateFirebase';

const userData = {
  uid: '1',
  githubAddress: 'string',
  nickname: 'Petrov',
  role: Role.mentor,
  studentsid: ['', ''],
  tasksID: ['', ''],
};
interface PropsMentorPage {
  usersData: UserBasic[];
  tasksData: ITask[];
  completedTasksData: IWorkDone[];
}

const MentorPage: React.FC<PropsMentorPage> = ({ usersData, tasksData, completedTasksData }) => {
  const [changeOutside, setChangeOutside] = useState<boolean>(false);
  const [task, setTask] = useState<ITask>({} as ITask);
  const [workDone, setWorkDone] = useState<IWorkDone>({} as IWorkDone);
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
    }, 700);
  }, []);

  const getTask = (taskID: string, userID: string) => {
    const selectWorkDone = completedTasksData.filter(
      (item) => item.taskID === taskID && item.student.id === userID
    );
    const selectTask = tasksData.filter((item) => item.id === taskID);
    if (selectWorkDone.length !== 0 && selectTask.length !== 0) {
      setTask(selectTask[0]);
      setWorkDone(selectWorkDone[0]);
    }
    setChangeOutside((prev) => !prev);
  };

  const onSave = (checkingTask: ICheсk) => {
    const neWworkDone: IWorkDone = {
      ...workDone,
      mentorCheck: checkingTask,
    };
    updateObjectField('completed_tasks', neWworkDone.id, neWworkDone);
  };

  const onSubmit = (checkingTask: ICheсk) => {
    const neWworkDone: IWorkDone = {
      ...workDone,
      mentorCheck: checkingTask,
    };
    updateObjectField('completed_tasks', neWworkDone.id, neWworkDone);
  };
  let mentorCheckJSX: JSX.Element = <></>;
  if (task.id !== undefined && workDone.id !== undefined) {
    mentorCheckJSX = (
      <MentorCheck
        task={task}
        workDone={workDone}
        changeOutside={changeOutside}
        onSave={onSave}
        onSubmit={onSubmit}
      />
    );
  } else {
    mentorCheckJSX = <></>;
  }
  return (
    <MainLayout title={'Mentor'}>
      <main className={'main__box'}>
        <div className="nav__main">
          <StudentList userData={usersData} myUid={myUid} getTask={getTask} />
        </div>
        <div className="workspace">{mentorCheckJSX}</div>
      </main>
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  let usersData: UserBasic[] = [] as UserBasic[];
  await db
    .collection('users')
    .get()
    .then((snap) => {
      if (snap !== undefined && snap !== null) {
        usersData = snap.docs.map((doc) => doc.data()) as UserBasic[];
      } else {
        usersData = [] as UserBasic[];
      }
    });
  let tasksData: ITask[] = [] as ITask[];
  await db
    .collection('TasksArray')
    .get()
    .then((snap) => {
      if (snap !== undefined && snap !== null) {
        tasksData = snap.docs.map((doc) => doc.data()) as ITask[];
      } else {
        tasksData = [] as ITask[];
      }
    });
  let completedTasksData: IWorkDone[] = [] as IWorkDone[];
  await db
    .collection('completed_tasks')
    .get()
    .then((snap) => {
      if (snap !== undefined && snap !== null) {
        completedTasksData = snap.docs.map((doc) => doc.data()) as IWorkDone[];
      } else {
        completedTasksData = [] as IWorkDone[];
      }
    });

  return {
    props: { usersData, tasksData, completedTasksData },
  };
};
export default MentorPage;
