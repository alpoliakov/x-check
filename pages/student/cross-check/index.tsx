import React from 'react';
import MainLayout from '../../../components/MainLayout';
import { Row, Col } from 'antd';
import Sidebar from '../../../components/student/cross-check/Sidebar';
import CheckTask from '../../..//components/student/check-task';
import { checkingTask, user } from '../../../components/student/test-task/test-work-done';
import { testTask } from '../../../components/student/test-task/test-task';
import { createTask } from '../../../components/student/check-task/common';
import { ICourse } from '../../../interfaces/ICourse';
import { ICheсk, TaskState } from '../../../interfaces/IWorkDone';
import { TypeTask } from '../../../interfaces/ITask';

interface PropsStudent {
  changeAuthorization: () => void;
}

const dataCourse: ICourse = {
  id: 123,
  name: 'course1',
  tasks: [
    {
      taskID: 123,
      name: 'task1',
      taskStage: 'stage',
      deadline: new Date(0),
      start: new Date(),
    },
    {
      taskID: 567,
      name: 'task2',
      taskStage: 'stage',
      deadline: new Date(2021, 0, 1),
      start: new Date(),
    },
    {
      taskID: 438,
      name: 'task3',
      taskStage: 'stage',
      deadline: new Date(0),
      start: new Date(),
    },
  ],
};

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

  // если IworkDone будет пустой, то создаем его на основе Таска
  const newCheckingTask = createTask(testTask, user);
  console.log('newCheckingTask', newCheckingTask);

  const role = user.role;
  const typeTask = TypeTask.SubmitTask;
  // const typeTask = TypeTask.ReviewTask;
  const [checkTask, reviewer] =
    checkingTask.state === TaskState.isSelfTest
      ? [checkingTask.selfTest, checkingTask.student]
      : [checkingTask.cheсks[1], checkingTask.reviewers[1]];
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
