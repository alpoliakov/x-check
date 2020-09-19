import React from 'react';
import { Button, Card, Col, Row, Space } from 'antd';
import AdminStatisticTask from './AdminStatisticTask/AdminStatisticTask';
import CurrentStage from './CurrentStage/CurrentStage';
import ActiveTask from './ActiveTask/ActiveTask';
import { ITask } from '../../interfaces/ITask';

interface AProps {
  tasks: any[];
  users: any[];
}

const TaskInformation: React.FC<AProps> = ({ tasks, users }) => {
  return (
    <>
      <Card style={{ marginTop: 30 }}>
        <Row>
          <Col>
            <ActiveTask task={tasks} />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <CurrentStage />
        </Row>
        <Row style={{ marginTop: 40 }}>
          <Col span={12}>
            <AdminStatisticTask user={users} />
          </Col>
          <Col
            span={12}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Space align="end" direction="vertical">
              <Button style={{ marginBottom: 20, width: 182 }} type="primary">
                Distribute for inspection
              </Button>
              <Button style={{ marginBottom: 20, width: 182 }} type="primary">
                Add grades to table
              </Button>
              <Button style={{ marginBottom: 10, width: 182 }} type="primary">
                Conflicts
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default TaskInformation;
