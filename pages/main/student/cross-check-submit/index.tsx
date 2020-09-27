import React from 'react';
import MainLayout from '../../../../components/MainLayout';
import { db } from '../../../../firebase';
import { Row, Col } from 'antd';
import Sidebar from '../../../../components/student/cross-check/sidebar';
import CheckTask from '../../../../components/student/check-task';
import { checkingTask, user } from '../../../../components/student/test-task/test-work-done';
import { testTask } from '../../../../components/student/test-task/test-task';
import { selfCheckingTask } from '../../../../components/student/test-task/selftest-work-done';
import { dataCourse } from '../../../../components/student/test-task/test-course';
import {
  createCheckOnReviewer,
  createMentorCheck,
  createTask,
} from '../../../../components/student/check-task/common';
import { ICheсk, IStudent, IWorkDone, TaskState } from '../../../../interfaces/IWorkDone';
import { ITask, TypeTask } from '../../../../interfaces/ITask';
import { Role } from '../../../../interfaces/IUser';
import { deleteDocument, setDocument } from '../../../../services/updateFirebase';

interface PropsCrossCheckPage {
  tasksData?: [];
  courseData?: [];
  completedTasksData?: [];
}

const CrossCheckPage: React.FC<PropsCrossCheckPage> = ({
  tasksData,
  courseData,
  completedTasksData,
}) => {
  const role = Role.student;
  const typeTask = TypeTask.SubmitTask;

  const [task, setTask] = React.useState('');
  const [isDeadline, setIsDeadline] = React.useState(false);
  const [isComplited, setIsComplited] = React.useState(false);

  console.log(task, isComplited, isDeadline);
  console.log('tasksData', tasksData);
  console.log('courseData', courseData);
  console.log('completedTasksData', completedTasksData);
  let checkTask: ICheсk;
  let reviewer: IStudent;
  let newCheckingTask: IWorkDone;
  if (!isComplited && !isDeadline) {
    newCheckingTask = createTask(testTask, user);
    [checkTask, reviewer] = [newCheckingTask.selfTest, newCheckingTask.student];
  } else if (isComplited && !isDeadline) {
    const select = tasksData?.filter((taskData) => taskData.name === task);
    const curCheckingTask = completedTasksData?.filter(
      (completedTask) => completedTask.taskID === select[0].id
    )[0];
    console.log('curCheckingTask', curCheckingTask);
    [checkTask, reviewer] = [curCheckingTask.selfTest, curCheckingTask.student];
  } else {
    const newCheckingTask = createTask(testTask, user);
    console.log('newCheckingTask', newCheckingTask);
    [checkTask, reviewer] = [newCheckingTask.selfTest, newCheckingTask.student];
  }

  // const newCheckingTask = createTask(testTask, user);
  // console.log('newCheckingTask', newCheckingTask);
  // const [checkTask, reviewer] = [newCheckingTask.selfTest, newCheckingTask.student];

  const selectTask = (selectTask: string) => {
    // setDocument('sessions', dataCourse.id, dataCourse);
    // deleteDocument('sessions', dataCourse.id);

    // setDocument('tasks', testTask.id, testTask);
    // deleteDocument('tasks', testTask.id);

    const select = tasksData?.filter((taskData) => taskData.name === selectTask);
    console.log('select', select[0].id);
    setTask(selectTask);

    const selectTaskDeadline = dataCourse.tasks
      .filter((taskData) => taskData.name === selectTask)
      .map((el) => el.deadline)[0];

    const date = new Date().getTime();

    setIsComplited(
      completedTasksData?.filter((completedTask) => completedTask.taskID === select[0].id)
        .length !== 0
    );

    if (selectTaskDeadline < date) {
      setIsDeadline(true);
    } else {
      setIsDeadline(false);
    }
  };

  const onSave = (checkTask: ICheсk) => {
    if (!isComplited && !isDeadline) {
      newCheckingTask = { ...newCheckingTask, selfTest: checkTask };
      console.log('Save in Data', newCheckingTask);
      // setDocument('completed_tasks', newCheckingTask.id, newCheckingTask);
      // deleteDocument('completed_tasks', newCheckingTask.id);
    }
  };

  const onSubmit = (checkTask: ICheсk) => {
    console.log('Change and save in Data', checkTask);
  };

  const taskList =
    dataCourse !== undefined ? /*courseData[0]*/ dataCourse.tasks.map((task) => task.name) : [];

  const taskJSX =
    task !== '' ? (
      <CheckTask
        task={testTask}
        checkingTask={checkTask}
        reviewer={reviewer}
        deployUrl={checkingTask.deployUrl}
        sourceGithubRepoUrl={checkingTask.sourceGithubRepoUrl}
        role={role}
        typeTask={typeTask}
        onSave={onSave}
        onSubmit={onSubmit}
      />
    ) : (
      <></>
    );

  return (
    <>
      <MainLayout title="Cross-Check: Submit">
        <main className={'main__box'}>
          <div className="nav__main">
            <Sidebar
              getTask={selectTask}
              taskList={taskList}
              isComplited={isComplited}
              isDeadline={isDeadline}
            />
          </div>
          <div className="workspace">{taskJSX}</div>
        </main>
      </MainLayout>
    </>
  );
};

export default CrossCheckPage;

export const getServerSideProps = async () => {
  let tasksData: any | undefined = [];
  await db
    .collection('tasks')
    .get()
    .then((snap) => {
      tasksData = snap.docs.map((doc) => doc.data());
    });

  let courseData: any | undefined = [];
  await db
    .collection('sessions')
    .get()
    .then((snap) => {
      courseData = snap.docs.map((doc) => doc.data());
    });

  let completedTasksData: any | undefined = [];
  await db
    .collection('completed_tasks')
    .get()
    .then((snap) => {
      completedTasksData = snap.docs.map((doc) => doc.data());
    });

  return {
    props: { tasksData, courseData, completedTasksData },
  };
};
