import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import TaskInformation from './TaskInformation/TaskInformation';
import AssignRole from './AssignRole/AssignRole';
import TableNewTask from './TableNewTask/TableNewTask';
import { distribute } from '../../services/distributeStudents';
import { ITaskStep } from '../../interfaces/ICourse';
import { ITask } from '../../interfaces/ITask';

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

interface PropsAdminMain {
  dataUsers: [];
  dataTasks: ITask[];
  crossCheckSession: ITaskStep[];
  visibleModal: boolean;
  getVisibleModal: (value: boolean) => void;
}

const AdminMain: React.FC<PropsAdminMain> = ({
  dataUsers,
  dataTasks,
  visibleModal,
  crossCheckSession,
  getVisibleModal,
}) => {
  const [users, setUser] = useState<any[]>(dataUsers);
  const [visible, setVisible] = useState<boolean>(visibleModal);
  useEffect(() => {
    console.log('DATA', dataUsers, dataTasks, crossCheckSession);
    setVisible(visibleModal);
  }, [visibleModal]);
  useEffect(() => {
    getVisibleModal(visible);
  }, [visible]);

  const handleOk = (e: any) => {
    setVisible(false);
    console.log(visible);
  };
  const handleCancel = (e: any) => {
    console.log(e);
    setVisible(false);
  };
  return (
    <div className="admin-wrapper">
      <Row>
        <TaskInformation crossCheckSession={crossCheckSession} tasks={tasks} users={users} />
      </Row>
      <Row gutter={[8, 8]} style={{ margin: 0 }}>
        <Col span={12} style={{ textAlign: 'center', margin: 0 }}>
          <Modal
            title="Course tasks"
            width={1000}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={handleOk}>
                Ok
              </Button>,
            ]}
          >
            <TableNewTask tasks={tasks} />
          </Modal>
        </Col>
        <Col span={12} style={{ textAlign: 'center', margin: '20px 0' }}></Col>
      </Row>
      <Row>
        <AssignRole users={users} />
      </Row>
    </div>
  );
};

export default AdminMain;
