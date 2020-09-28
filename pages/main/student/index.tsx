import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { db } from '../../../firebase';
import MainLayout from '../../../components/MainLayout';
import SidebarTask from '../../../components/student/sidebar-task-cross-check';
import { UserBasic } from '../../../interfaces/IUser';

interface PropsStudentPage {
  data: [];
}

const StudentPage: React.FC<PropsStudentPage> = ({ data }) => {
  const { Title } = Typography;
  const nameButton: Array<string> = ['Cross-check: Submit', 'Cross-check: Review'];
  const [stateStudent, setStateStudent] = useState<UserBasic>({} as UserBasic);
  const getUser = (user: UserBasic) => {
    setStateStudent(user);
  };
  const nameStudent = stateStudent.nickname !== undefined ? stateStudent.nickname : 'Student Page';

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