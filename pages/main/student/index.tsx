import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { db } from '../../../firebase';
import MainLayout from '../../../components/MainLayout';
import SidebarTask from '../../../components/student/sidebar-task-cross-check';
import { StudentBasic } from '../../../interfaces/IUser';

interface PropsStudentPage {
<<<<<<< HEAD
  data?: [];
  data2?: [];
=======
  data: [];
>>>>>>> a08e12388eeec4af385e31555f47d0252a1cc237
}

const StudentPage: React.FC<PropsStudentPage> = ({ data }) => {
  const { Title } = Typography;
<<<<<<< HEAD

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
=======
  const nameButton: Array<string> = ['Cross-check: Submit', 'Cross-check: Review'];
  const [stateStudent, setStateStudent] = useState<StudentBasic>({} as StudentBasic);
  const getUser = (user: StudentBasic) => {
    setStateStudent(user);
>>>>>>> a08e12388eeec4af385e31555f47d0252a1cc237
  };
  const nameStudent = stateStudent.name !== undefined ? stateStudent.name : 'Student Page';

  return (
    <MainLayout title={''}>
      <Title level={1}>Student Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
<<<<<<< HEAD
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
          {toUsers && <Users data={data} />}
          {toTasks && <Tasks data2={data2} />}
          {toNewTask && <Myform />}
=======
            <SidebarTask dataCategory={nameButton} nameStudent={nameStudent} />
          </div>
>>>>>>> a08e12388eeec4af385e31555f47d0252a1cc237
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
