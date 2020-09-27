import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { db } from '../../../firebase';
import MainLayout from '../../../components/MainLayout';
import SidebarTask from '../../../components/student/sidebar-task-cross-check';
import { StudentBasic } from '../../../interfaces/IUser';

interface PropsStudentPage {
  data: [];
}

const StudentPage: React.FC<PropsStudentPage> = ({ data }) => {
  const { Title } = Typography;
  const nameButton: Array<string> = ['Cross-check: Submit', 'Cross-check: Review'];
  const [stateStudent, setStateStudent] = useState<StudentBasic>({} as StudentBasic);
  const getUser = (user: StudentBasic) => {
    setStateStudent(user);
  };
  const nameStudent = stateStudent.name !== undefined ? stateStudent.name : 'Student Page';
  return (
    <MainLayout title={''}>
      <Title level={1}>Student Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
            <SidebarTask dataCategory={nameButton} nameStudent={nameStudent} />
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
