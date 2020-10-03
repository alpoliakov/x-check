import React, { useEffect, useState } from 'react';
import MainLayout from '../../../components/MainLayout';
import StudentList from '../../../components/Mentor/StudentsList/index';
import { auth, db } from '../../../firebase';
import Work from '../../../components/Work';

interface PropsMentorPage {
  userData: [];
}

const MentorPage: React.FC<PropsMentorPage> = ({ userData }) => {
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
    }, 700);
  }, []);

  const getTask = (value: any) => {
    setTask(value);
  };

  return (
    <MainLayout title={'Mentor'}>
      <main className={'main__box'}>
        <div className="nav__main">
          <StudentList userData={userData} myUid={myUid} getTask={getTask} />
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
