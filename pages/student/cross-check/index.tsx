import React from 'react';
import MainLayout from '../../../components/MainLayout';
import { Row, Col } from 'antd';
import Sidebar from '../../../components/student/cross-check/Sidebar';

import { ICourse } from '../../../interfaces/ICourse';

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
      deadline: new Date(),
      start: new Date(),
    },
    {
      taskID: 567,
      name: 'task2',
      taskStage: 'stage',
      deadline: new Date(),
      start: new Date(),
    },
    {
      taskID: 438,
      name: 'task3',
      taskStage: 'stage',
      deadline: new Date(),
      start: new Date(),
    },
  ],
};

const CrossCheckPage: React.FC<PropsStudent> = ({ changeAuthorization }) => {
  const tasksData = dataCourse.tasks;

  const [task, setTask] = React.useState('');

  const getTask = (task: string) => {
    setTask(task);
  };

  return (
    <>
      <MainLayout title="Student" changeAuthorization={changeAuthorization}>
        <Row gutter={6}>
          <Col>
            <Sidebar getTask={getTask} tasksData={tasksData} />
          </Col>
          <Col />
        </Row>
      </MainLayout>
    </>
  );
};

export default CrossCheckPage;
