import React, { useState } from 'react';
import MainLayout from '../../../components/MainLayout';
import { CheckCircleTwoTone, CodeTwoTone, HomeTwoTone } from '@ant-design/icons';
import { List } from 'antd';
import StudentHome from '../../../components/student/student-houm/StudentHome';
import CrossCheckSubmitPage from './cross-check-submit';
import CrossCheckReviewPage from './cross-check-review';
import { db } from '../../../firebase';
import { ITask } from '../../../interfaces/ITask';
import { ICourse } from '../../../interfaces/ICourse';
import { IWorkDone } from '../../../interfaces/IWorkDone';

interface PropsStudentPage {
  tasksData: ITask[];
  courseData: ICourse[];
  completedTasksData: IWorkDone[]; // была проблема в 56 строки, ты присваивал свойство от undefined
}

const StudentPage: React.FC<PropsStudentPage> = ({ tasksData, courseData, completedTasksData }) => {
  const [houmPage, setHoumPage] = useState<boolean>(true);
  const [CCSubmit, setCCSubmit] = useState<boolean>(false);

  const goToHoum = () => {
    setHoumPage(true);
    setCCSubmit(false);
  };
  const goToCCSubmit = () => {
    setCCSubmit(true);
    setHoumPage(false);
  };
  const goToCCReview = () => {
    setHoumPage(false);
    setCCSubmit(false);
  };
  return (
    <MainLayout title={'Student'}>
      <main className={'main__box'}>
        <div className="nav__main">
          <div style={{ marginRight: '20px', width: '220px' }}>
            <List size="small" bordered>
              <List.Item key={'Home'} onClick={goToHoum}>
                <div>
                  <HomeTwoTone twoToneColor="#40E127" style={{ marginRight: '4px' }} />
                  <a>Home</a>
                </div>
              </List.Item>
              <List.Item key={'Cross-check: Submit'} onClick={goToCCSubmit}>
                <div>
                  <CodeTwoTone style={{ marginRight: '4px' }} />
                  <a>Cross-check: Submit</a>
                </div>
              </List.Item>
              <List.Item key={'Cross-check: Review'} onClick={goToCCReview}>
                <div>
                  <CheckCircleTwoTone twoToneColor="#eb2f96" style={{ marginRight: '4px' }} />
                  <a>Cross-check: Review</a>
                </div>
              </List.Item>
            </List>
          </div>
        </div>
        <div className="workspace">
          {houmPage ? (
            <StudentHome />
          ) : CCSubmit ? (
            <CrossCheckSubmitPage tasksData={tasksData}, courseData={courseData}, completedTasksData={completedTasksData}/>
          ) : (
            <CrossCheckReviewPage />
          )}
        </div>
      </main>
    </MainLayout>
  );
};
export const getServerSideProps = async () => {
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
  let courseData: ICourse[] = [] as ICourse[];
  await db
    .collection('sessions')
    .get()
    .then((snap) => {
      if (snap !== undefined && snap !== null) {
        courseData = snap.docs.map((doc) => doc.data()) as ICourse[];
      } else {
        courseData = [] as ICourse[];
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
    props: { tasksData, courseData, completedTasksData },
  };
};

export default StudentPage;