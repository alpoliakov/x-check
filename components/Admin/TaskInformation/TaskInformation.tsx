import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space } from 'antd';
import AdminStatisticTask from '../AdminStatisticTask/index';
import CurrentStage from '../CurrentStage/index';
import ActiveTask from '../ActiveTask/index';
import { ITask } from '../../../interfaces/ITask';
import { ICourse, ITaskStep } from '../../../interfaces/ICourse';
import { UserBasic } from '../../../interfaces/IUser';

interface PropsTaskInformation {
  users: UserBasic[];
  dataSession: ICourse[];
}

const TaskInformation: React.FC<PropsTaskInformation> = ({ users, dataSession }) => {
  const [activeTask, setActiveTask] = useState<string | undefined>(undefined);
  const [taskStage, setTaskStage] = useState<string | undefined>();
  useEffect(() => {
    if (activeTask !== undefined) {
      const active: any = dataSession[0].tasks.find((e) => e.name === activeTask);
      setTaskStage(active.taskStage);
    }
  }, [activeTask]);
  const getActiveTask = (value: string) => {
    setActiveTask(value);
  };
  const getTaskStage = (value: string | undefined) => {
    setTaskStage(value);
  };
  return (
    <>
      <Card style={{ marginTop: 30 }}>
        <Row>
          <Col>
            <ActiveTask
              getActiveTask={getActiveTask}
              activeTask={activeTask}
              dataSession={dataSession}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <CurrentStage
            getTaskStage={getTaskStage}
            dataSession={dataSession}
            activeTask={activeTask}
          />
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
              <Button
                disabled={taskStage !== 'REQUESTS_GATHERING'}
                style={{ marginBottom: 20, width: 182 }}
                type="primary"
              >
                Distribute for inspection
              </Button>
              <Button
                disabled={taskStage !== 'COMPLETED'}
                style={{ marginBottom: 20, width: 182 }}
                type="primary"
              >
                Add grades to table
              </Button>
              <Button
                disabled={taskStage !== 'CROSS_CHECK'}
                style={{ marginBottom: 10, width: 182 }}
                type="primary"
              >
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
