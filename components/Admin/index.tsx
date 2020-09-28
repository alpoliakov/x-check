import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import TaskInformation from './TaskInformation/TaskInformation';
import AssignRole from './AssignRole/AssignRole';
import TableNewTask from './TableNewTask/TableNewTask';
import { distribute } from '../../services/distributeStudents';
import { ITaskStep } from '../../interfaces/ICourse';
import { ITask } from '../../interfaces/ITask';

interface PropsAdminMain {
  dataUsers: [];
  dataTasks: ITask[];
  crossCheckSession: ITaskStep[];
  dataSession: any;
  visibleModal: boolean;
  getVisibleModal: (value: boolean) => void;
}

const AdminMain: React.FC<PropsAdminMain> = ({
  dataUsers,
  dataTasks,
  visibleModal,
  crossCheckSession,
  dataSession,
  getVisibleModal,
}) => {
  const [users, setUser] = useState<any[]>(dataUsers);
  const [visible, setVisible] = useState<boolean>(visibleModal);
  useEffect(() => {
    console.log('DATA', dataUsers, dataTasks, crossCheckSession, dataSession);
    setVisible(visibleModal);
  }, [visibleModal]);
  useEffect(() => {
    getVisibleModal(visible);
  }, [visible]);

  const handleOk = (e: any) => {
    setVisible(false);
  };
  return (
    <div className="admin-wrapper">
      <Row>
        <TaskInformation crossCheckSession={crossCheckSession} tasks={dataTasks} users={users} />
      </Row>
      <Row gutter={[8, 8]} style={{ margin: 0 }}>
        <Col span={12} style={{ textAlign: 'center', margin: 0 }}>
          <Modal
            title="Course tasks"
            width={'auto'}
            visible={visible}
            onOk={handleOk}
            onCancel={() => setVisible(false)}
            footer={[
              <Button key="submit" type="primary" onClick={handleOk}>
                Ok
              </Button>,
            ]}
          >
            <TableNewTask tasks={dataTasks} />
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
