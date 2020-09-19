import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Space, Input, Modal } from 'antd';
import CurrentStage from './CurrentStage/CurrentStage';
import ActiveTask from './ActiveTask/ActiveTask';
import { checkRef, databaseRef } from '../../firebase';
import TaskInformation from './TaskInformation';
import AssignRole from './AssignRole/AssignRole';
import TableNewTask from './TableNewTask';

const data = [
  {
    id: '1',
    name: 'Virtual Keyboard',
    authorName: 'John Brown',
    action: 'delete',
    state: 'draft',
    deadline: '2020-09-15',
    start: '2020-09-15',
  },
  {
    id: '2',
    name: 'English for kids',
    authorName: 'John Brown',
    action: 'delete',
    state: 'published',
    deadline: '2020-09-15',
    start: '2020-09-15',
  },
  {
    id: '3',
    name: 'MovieSearch',
    authorName: 'John Brown',
    action: 'delete',
    state: 'published',
    deadline: '2020-09-15',
    start: '2020-09-15',
  },
  {
    id: '4',
    name: 'Gem Puzzle',
    authorName: 'John Brown',
    action: 'delete',
    state: 'active',
    deadline: '2020-09-15',
    start: '2020-09-15',
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
]; // rowSelection object indicates the need for row selection

const AdminMain: React.FC = () => {
  const [users, setUser] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    /*      const changeRoleRef = checkRef.child('-MGoW-MfatwATMbO2Xh0').child('roles')
    changeRoleRef.transaction(function(currentRole) {
    return   currentRole = ['admin']
   });  */

    databaseRef.on(
      'value',
      function (snapshot) {
        const userArray = snapshot.val();
        console.log(userArray);
      },
      function (error: any) {
        console.log('Error: ' + error.code);
      }
    );

    checkRef.on(
      'value',
      function (snapshot) {
        const userArray = snapshot.val();
        console.log(userArray);
        setUser(userArray);
      },
      function (error: any) {
        console.log('Error: ' + error.code);
      }
    );
    distribute();
  }, []);
  const distribute = () => {
    const createArray: any = [];
    const jsObj: any = {};
    for (let i = 0; i <= 4; i++) {
      const key = 'key' + i;
      const obj: any = {
        [key]: { name: [], id: [] },
      };

      createArray.push(obj);
    }

    console.log(createArray);
    const fourArray = Array(4)
      .fill(createArray)
      .flat()
      .sort(() => Math.random() - 0.5);
    console.log(fourArray);

    /* for (let i = 0; i < createArray.length; i += 1) {
      const keyResult = Object.keys(createArray[i])[0];
      const valueResult: any = Object.values(createArray[i])[0];
      if (valueResult.name.length === 4) {
        break;
      }
      console.log(createArray[i].name, keyResult, valueResult.name);
      for (let j = 0; valueResult.name.length < 4; j += 1) {
        const q = fourArray.shift();
        const w = Object.keys(q);
        console.log(w[0], keyResult, valueResult.name.length);
        const isElement = valueResult.name.includes(w[0]);
        if (keyResult !== w[0]) {
          if (!isElement) {
            valueResult.name.push(q);
            console.log('-----', valueResult.name, fourArray);
          }
        } else {
          fourArray.push(q);
        }
      }
    } */

    console.log('result', createArray);
  };
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
        <TaskInformation tasks={data} users={users} />
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
            <TableNewTask data={data} />
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
