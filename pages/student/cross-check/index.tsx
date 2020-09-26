import React from 'react';
import MainLayout from '../../../components/MainLayout';
import { Row, Col } from 'antd';
import Sidebar from '../../../components/student/cross-check/Sidebar';
import CheckTask from '../../..//components/student/check-task';
import { checkingTask, user } from '../../../components/student/test-task/test-work-done';
import { testTask } from '../../../components/student/test-task/test-task';
import { selfCheckingTask } from '../../../components/student/test-task/selftest-work-done';
import { dataCourse } from '../../../components/student/test-task/test-course';
import {
  createCheckOnReviwer,
  createMentorCheck,
  createTask,
} from '../../../components/student/check-task/common';
import { ICheсk, TaskState } from '../../../interfaces/IWorkDone';
import { TypeTask } from '../../../interfaces/ITask';
import { Role } from '../../../interfaces/IUser';

interface PropsStudent {
  changeAuthorization: () => void;
}

const CrossCheckPage: React.FC<PropsStudent> = ({ changeAuthorization }) => {
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

  // const newCheckingTask = createTask(testTask, user);
  // const typeTask = TypeTask.SubmitTask;
  // const [checkTask, reviewer] = [newCheckingTask.selfTest, newCheckingTask.student];

  // /* 2. До сабмита (правка IwokDone)  своя работа */

  // const typeTask = TypeTask.SubmitTask;
  // const [checkTask, reviewer] = [checkingTask.selfTest, checkingTask.student];

  // /* 3. После сабмита (создания IwokDone.checks по reviewers) */
  // const typeTask = TypeTask.ReviewTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviwer(selfCheckingTask, selfCheckingTask.reviewers[1]),
  //   selfCheckingTask.reviewers[1],
  // ];

  // /* 3.1 После сабмита (создания IwokDone.mentor ) */
  // role = Role.mentor;
  // const typeTask = TypeTask.ReviewTask;
  // const [checkTask, reviewer] = [createMentorCheck(selfCheckingTask), selfCheckingTask.mentor];

  // /* 4. Проверка чужой работа */
  const typeTask = TypeTask.ReviewTask;
  const [checkTask, reviewer] = [
    createCheckOnReviwer(selfCheckingTask, selfCheckingTask.reviewers[0]),
    selfCheckingTask.reviewers[0],
  ];

  // /* 4.1. Проверка своей работа */
  // const typeTask = TypeTask.SubmitTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviwer(selfCheckingTask, selfCheckingTask.reviewers[0]),
  //   selfCheckingTask.reviewers[0],
  // ];

  // /* 5. Согласование оценки (своя работа) */
  // const typeTask = TypeTask.SubmitTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviwer(checkingTask, checkingTask.reviewers[1]),
  //   checkingTask.reviewers[1],
  // ];

  // /* 6. Согласовано (своя работа) */
  // const typeTask = TypeTask.SubmitTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviwer(checkingTask, checkingTask.reviewers[2]),
  //   checkingTask.reviewers[2],
  // ];

  // /* 7. Согласовано (чужая работа) */
  // const typeTask = TypeTask.ReviewTask;
  // const [checkTask, reviewer] = [
  //   createCheckOnReviwer(checkingTask, checkingTask.reviewers[2]),
  //   checkingTask.reviewers[2],
  // ];

  /* 8. Ментор (своя работа) */
  // role = Role.mentor;
  // const typeTask = TypeTask.ReviewTask;
  // const [checkTask, reviewer] = [checkingTask.selfTest, checkingTask.mentor];

  return (
    <>
      <MainLayout title="Student" changeAuthorization={changeAuthorization}>
        <Row>
          <Col span={5}>
            <Sidebar getTask={selectTask} taskList={taskList} isDeadline={isDeadline} />
          </Col>
          <Col span={18}>
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
          </Col>
        </Row>
      </MainLayout>
    </>
  );
};

export default CrossCheckPage;
