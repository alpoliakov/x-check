import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import TaskInformation from './TaskInformation/TaskInformation';
import AssignRole from './AssignRole/AssignRole';
import TableNewTask from './TableNewTask/TableNewTask';
import { distribute } from '../../services/distributeStudents';

const tasks = [
  {
    id: '1',
    name: 'Virtual Keyboard',
    authorName: 'John Brown',
    action: 'delete',
    state: 'active',
    deadline: '2020-09-15',
    start: '2020-01-15',
  },
  {
    id: '2',
    name: 'English for kids',
    authorName: 'John Brown',
    action: 'delete',
    state: 'active',
    deadline: '2020-09-15',
    start: '2020-09-15',
  },
  {
    id: '3',
    name: 'MovieSearch',
    authorName: 'John Brown',
    action: 'delete',
    state: 'active',
    deadline: '2020-09-15',
    start: '2020-09-15',
  },
  {
    id: '4',
    name: 'Gem Puzzle',
    authorName: 'John Brown',
    action: 'delete',
    state: 'published',
    deadline: '2020-02-15',
    start: '2020-03-15',
  },
  {
    id: '5',
    name: 'Singolo',
    authorName: 'John Brown',
    action: 'delete',
    state: 'draft',
    deadline: '2020-09-15',
    start: '2020-09-15',
  },
];

const course = {
  id: 1,
  name: 'React',
  tasks: [
    {
      taskID: 1,
      name: 'Virtual Keyboard',
      taskStage: 'REQUESTS_GATHERING',
      deadline: '2020-01-20',
      start: '2020-02-02',
    },
    {
      taskID: 2,
      name: 'English for kids',
      taskStage: 'CROSS_CHECK',
      deadline: '2020-05-20',
      start: '2020-06-02',
    },
    {
      taskID: 3,
      name: 'MovieSearch',
      taskStage: 'COMPLETED',
      deadline: '2020-05-24',
      start: '2020-06-20',
    },
  ],
};

const user = {};

interface PropsAdminMain {
  dataUsers: [];
  dataTasks: [];
}

const AdminMain: React.FC<PropsAdminMain> = ({ dataUsers, dataTasks }) => {
  const [users, setUser] = useState<any[]>(dataUsers);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    console.log('DATA', dataUsers, dataTasks);
  }, [course]);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e: any) => {
    console.log(e);
    setVisible(false);
  };
  const handleCancel = (e: any) => {
    console.log(e);
    setVisible(false);
  };
  return (
    <div className="admin-wrapper">
      <Row>
        <TaskInformation course={course} tasks={tasks} users={users} />
      </Row>
      <Row gutter={[8, 8]} style={{ margin: '0 30px' }}>
        <Col span={12} style={{ textAlign: 'center', margin: '20px 0' }}>
          <Button type="primary" onClick={showModal}>
            Start new task
          </Button>
          <Modal
            title="Course tasks"
            width={1000}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                Submit
              </Button>,
            ]}
          >
            <TableNewTask course={course} tasks={tasks} />
          </Modal>
        </Col>
        <Col span={12} style={{ textAlign: 'center', margin: '20px 0' }}>
          <Button type="primary">Creat task</Button>
        </Col>
      </Row>
      <Row>
        <AssignRole user={users} />
      </Row>
    </div>
  );
};

export default AdminMain;
