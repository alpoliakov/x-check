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
import { ICheсk, TaskState } from '../../../../interfaces/IWorkDone';
import { TypeTask } from '../../../../interfaces/ITask';
import { Role } from '../../../../interfaces/IUser';

interface PropsCrossCheckPage {
  data?: [];
}

const CrossCheckPage: React.FC<PropsCrossCheckPage> = ({ data }) => {
  console.log(data);
  const tasksData = dataCourse.tasks;
  const taskList = tasksData.map((el) => el.name);

  const [task, setTask] = React.useState('');
  const [isDeadline, setIsDeadline] = React.useState(false);

  const selectTask = (task: string) => {
    setTask(task);

    const selectTaskDeadline = tasksData
      .filter((el) => el.name === task)
      .map((el) => el.deadline)[0];

    const date = new Date();

    if (selectTaskDeadline.getTime() < date.getTime()) {
      setIsDeadline(true);
    } else {
      setIsDeadline(false);
    }
  };

  const onSave = (checkTask: ICheсk) => {
    console.log('Save in Data', checkTask);
  };

  const onSubmit = (checkTask: ICheсk) => {
    console.log('Change and save in Data', checkTask);
  };
  let role = user.role;

  // /* 1. До Сабмита (Создания IwokDone)
  // если IworkDone будет пустой, то создаем его на основе Таска*/

  const newCheckingTask = createTask(testTask, user);
  const typeTask = TypeTask.SubmitTask;
  const [checkTask, reviewer] = [newCheckingTask.selfTest, newCheckingTask.student];

  // /* 2. До сабмита (правка IwokDone)  своя работа */

  // const typeTask = TypeTask.SubmitTask;
  // const [checkTask, reviewer] = [checkingTask.selfTest, checkingTask.student];

  // /* 3. После сабмита (создания IwokDone.checks по reviewers) */
  // const typeTask = TypeTask.ReviewTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviewer(testTask, selfCheckingTask, selfCheckingTask.reviewers[1]),
  //   selfCheckingTask.reviewers[1],
  // ];

  // /* 3.1 После сабмита (создания IwokDone.mentor ) */
  // role = Role.mentor;
  // const typeTask = TypeTask.ReviewTask;
  // const [checkTask, reviewer] = [createMentorCheck(selfCheckingTask), selfCheckingTask.mentor];

  // /* 4. Проверка чужой работа */
  // const typeTask = TypeTask.ReviewTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviewer(testTask, selfCheckingTask, selfCheckingTask.reviewers[0]),
  //   selfCheckingTask.reviewers[0],
  // ];

  // /* 4.1. Проверка своей работа, когда ее не проверили*/
  // const typeTask = TypeTask.SubmitTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviewer(testTask, selfCheckingTask, checkingTask.reviewers[2]),
  //   checkingTask.reviewers[2],
  // ];

  // /* 5. Согласование оценки (своя работа) */
  // const typeTask = TypeTask.SubmitTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviewer(testTask, selfCheckingTask, selfCheckingTask.reviewers[0]),
  //   selfCheckingTask.reviewers[0],
  // ];

  // /* 5.1 Согласование оценки ментора (своя работа) */
  // role = Role.mentor;
  // const typeTask = TypeTask.SubmitTask;
  // const [checkTask, reviewer] = [createMentorCheck(selfCheckingTask), selfCheckingTask.mentor];

  // /* 6. Согласовано (своя работа) */
  // const typeTask = TypeTask.SubmitTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviewer(testTask, checkingTask, checkingTask.reviewers[1]),
  //   checkingTask.reviewers[1],
  // ];

  // /* 6.1 Согласовано (чужая работа) */
  // const typeTask = TypeTask.ReviewTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviewer(testTask, checkingTask, checkingTask.reviewers[1]),
  //   checkingTask.reviewers[1],
  // ];

  // /* 6.2. Согласовано Ментор (чужая работа) */
  // role = Role.mentor;
  // const typeTask = TypeTask.ReviewTask;
  // const [checkTask, reviewer] = [createMentorCheck(checkingTask), checkingTask.mentor];

  /* 7. Dispute (своя работа) */
  // const typeTask = TypeTask.SubmitTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviewer(testTask, checkingTask, checkingTask.reviewers[2]),
  //   checkingTask.reviewers[2],
  // ];

  // /* 7.1 Dispute (чужая работа) */
  // const typeTask = TypeTask.ReviewTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviewer(testTask, checkingTask, checkingTask.reviewers[2]),
  //   checkingTask.reviewers[2],
  // ];

  // /* 7.2. Dispute Ментор (чужая работа) */
  // role = Role.mentor;
  // const typeTask = TypeTask.ReviewTask;
  // const [checkTask, reviewer] = [createMentorCheck(checkingTask), checkingTask.mentor];

  return (
    <>
      <MainLayout title="Student">
        <main className={'main__box'}>
          <div className="nav__main">
            <Sidebar getTask={selectTask} taskList={taskList} isDeadline={isDeadline} />
          </div>
          <div className="workspace">
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
          </div>
        </main>
      </MainLayout>
    </>
  );
};

export default CrossCheckPage;

export const getServerSideProps = async () => {
  let data: any | undefined = [];
  await db
    .collection('task')
    .get()
    .then((snap) => {
      data = snap.docs.map((doc) => doc.data());
    });

  return {
    props: { data },
  };
};
