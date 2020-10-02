import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import TaskInformation from './TaskInformation/TaskInformation';
import AssignRole from './AssignRole/AssignRole';
import TableNewTask from './TableNewTask/TableNewTask';
import { distribute } from '../../services/distributeStudents';
import { ICourse, ITaskStep } from '../../interfaces/ICourse';
import { ITask } from '../../interfaces/ITask';
import { UserBasic } from '../../interfaces/IUser';
import { IWorkDone } from '../../interfaces/IWorkDone';
import { setDocument } from '../../services/updateFirebase';

interface PropsAdminMain {
  dataUsers: UserBasic[];
  dataTasks: ITask[];
  dataSession: ICourse;
  dataCompletedTask: IWorkDone[];
  visibleModal: boolean;
  getVisibleModal: (value: boolean) => void;
  getClickTask: (value: string) => void;
}

const AdminMain: React.FC<PropsAdminMain> = ({
  dataUsers,
  dataTasks,
  visibleModal,
  dataSession,
  dataCompletedTask,
  getVisibleModal,
  getClickTask,
}) => {
  const [users, setUser] = useState<any[]>(dataUsers);
  const [visible, setVisible] = useState<boolean>(visibleModal);
  const [dataSessions, setDataSessions] = useState<ICourse>(dataSession);
  const [render, setRender] = useState<string>();

  useEffect(() => {
    setVisible(visibleModal);
  }, [visibleModal]);
  useEffect(() => {
    getVisibleModal(visible);
  }, [visible]);
  const updateDataSession = (data: ICourse, value: string) => {
    setDataSessions(data);
    setRender(value);
  };

  useEffect(() => {
    console.log('dataupdate');
  }, [render]);

  const handleOk = () => {
    setVisible(false);
  };
  return (
    <div className="admin-wrapper">
      <Row>
        <TaskInformation
          updateDataSession={updateDataSession}
          dataSession={dataSessions}
          users={users}
          dataCompletedTask={dataCompletedTask}
        />
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
            <TableNewTask
              updateDataSession={updateDataSession}
              dataSession={dataSessions}
              getClickTask={getClickTask}
              tasks={dataTasks}
            />
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
