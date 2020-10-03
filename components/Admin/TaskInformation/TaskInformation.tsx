import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space } from 'antd';
import AdminStatisticTask from '../AdminStatisticTask/index';
import CurrentStage from '../CurrentStage/index';
import ActiveTask from '../ActiveTask/index';
import { ITask } from '../../../interfaces/ITask';
import { ICourse, ITaskStep } from '../../../interfaces/ICourse';
import { UserBasic } from '../../../interfaces/IUser';
import { IWorkDone } from '../../../interfaces/IWorkDone';
import { updateObjectField } from '../../../services/updateFirebase';
import firebase from 'firebase';
import { distribute } from '../../../services/distributeStudents';

interface PropsTaskInformation {
  users: UserBasic[];
  dataSession: ICourse;
  dataCompletedTask: IWorkDone[];
  updateDataSession: (data: ICourse, value: string) => void;
}

const TaskInformation: React.FC<PropsTaskInformation> = ({
  users,
  dataSession,
  dataCompletedTask,
  updateDataSession,
}) => {
  const [activeTask, setActiveTask] = useState<string | undefined>(undefined);
  const [taskStage, setTaskStage] = useState<string | undefined>();
  const [session, setSession] = useState(dataSession);
  useEffect(() => {
    if (activeTask !== undefined) {
      const active: any = dataSession.tasks.find((e) => e.taskID === activeTask);
      setTaskStage(active.taskStage);
      setSession(dataSession);
    }
  }, [activeTask]);

  const getActiveTask = (value: string) => {
    setActiveTask(value);
  };
  const getTaskStage = (value: string | undefined) => {
    setTaskStage(value);
  };

  /*   const distributeTest = () => {
    dataCompletedTask.forEach((e) => {
      e.reviewers.push(e.student);
      updateObjectField('completed_tasks', e.id, {
        reviewers: firebase.firestore.FieldValue.arrayUnion(e.student),
      });
    });

    console.log(dataCompletedTask);
  }; */
  return (
    <>
      <Card style={{ marginTop: 30 }}>
        <Row>
          <Col>
            <ActiveTask
              getActiveTask={getActiveTask}
              activeTask={activeTask}
              dataSession={session}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <CurrentStage
            getTaskStage={getTaskStage}
            dataSession={dataSession}
            activeTask={activeTask}
            updateDataSession={updateDataSession}
          />
        </Row>
        <Row style={{ marginTop: 40 }}>
          <Col span={12}>
            <AdminStatisticTask
              dataCompletedTask={dataCompletedTask}
              activeTask={activeTask}
              user={users}
            />
          </Col>
          <Col
            span={12}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Space align="end" direction="vertical">
              {/*      <Button
                style={{ marginBottom: 20, width: 182 }}
                type="primary"
                onClick={distributeTest}
              >
                Distribute TEST
              </Button> */}
              <Button
                disabled={taskStage !== 'CROSS_CHECK'}
                style={{ marginBottom: 20, width: 182 }}
                type="primary"
                onClick={() => distribute(dataCompletedTask, activeTask)}
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
