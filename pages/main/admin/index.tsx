import React, { useState } from 'react';
import { Button, Modal, Row, Typography } from 'antd';
import MainLayout from '../../../components/MainLayout';
import SubmitRandom from './submit-random';
import { db } from '../../../firebase';
import AdminMain from '../../../components/Admin/index';
import Form from '../../../components/Form';
import TableData from '../../../components/TableData';
import Import from '../../../components/Import';
import { ITask } from '../../../interfaces/ITask';
import { UserBasic } from '../../../interfaces/IUser';
import { ICourse } from '../../../interfaces/ICourse';
import { IWorkDone, TaskState } from '../../../interfaces/IWorkDone';

interface PropsAdmin {
  dataUsers: UserBasic[];
  dataTasks: ITask[];
  dataReviews: [];
  dataSession: ICourse[];
  dataReviewRequest: [];
  dataCompletedTask: IWorkDone[];
}

const AdminPage: React.FC<PropsAdmin> = ({
  dataUsers,
  dataTasks,
  dataReviews,
  dataReviewRequest,
  dataSession,
  dataCompletedTask,
}) => {
  const { Title } = Typography;
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [visibleImport, setVisibleImport] = useState<boolean>(false);
  const [visitableTable, setVisitableTable] = useState<boolean>(false);
  const [visitableReviewTable, setVisitableReviewTable] = useState<boolean>(false);
  const [adminMain, setAdminMain] = useState<boolean>(true);
  const [transferTaskForm, setTransferTaskForm] = useState<ITask | boolean>(false);

  const showModalCreateTask = () => {
    setAdminMain(false);
    setTransferTaskForm(false);
  };
  const getClickTask = (value: string) => {
    const taskFarm = dataTasks.filter((e) => e.name === value)[0];
    setAdminMain(false);
    setVisibleModal(false);
    setTransferTaskForm(taskFarm);
  };
  const showTable = () => {
    setVisitableTable(true);
  };
  const showReviewTable = () => {
    setVisitableReviewTable(true);
  };
  const showImport = () => {
    setVisibleImport(true);
  };
  const showModal = () => {
    setAdminMain(true);
    setVisibleModal(true);
  };
  const returnAdminMain = () => {
    setAdminMain(true);
  };
  const getVisibleModal = (value: boolean) => {
    setVisibleModal(value);
  };
  const handleOkImport = (e: any) => {
    setVisibleImport(false);
  };
  const handleOkTable = (e: any) => {
    setVisitableTable(false);
    setVisitableReviewTable(false);
  };
  const task = {};

  return (
    <MainLayout title={'main: admin'}>
      <Title level={1}>Admin Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
            {/*    <Title level={2}>Admin</Title>
            <SubmitRandom /> */}
            <Row>
              <Button
                type="primary"
                style={{ width: 150, marginTop: 20 }}
                onClick={showModalCreateTask}
              >
                Create task
              </Button>
            </Row>
            <Row>
              <Button type="primary" style={{ width: 150, marginTop: 20 }} onClick={showImport}>
                Import/Export
              </Button>
            </Row>
            <Row>
              <Button type="primary" style={{ width: 150, marginTop: 20 }} onClick={showModal}>
                Start new task
              </Button>
            </Row>
            <Row>
              <Button type="primary" style={{ width: 150, marginTop: 20 }} onClick={showTable}>
                Table results
              </Button>
            </Row>
            <Row>
              <Button
                type="primary"
                style={{ width: 150, marginTop: 20 }}
                onClick={showReviewTable}
              >
                Review requests
              </Button>
            </Row>
          </div>
        </div>
        <div className="workspace">
          <Modal
            width={'1200px'}
            onCancel={handleOkImport}
            visible={visibleImport}
            onOk={handleOkImport}
          >
            <Import dataTasks={dataTasks} />
          </Modal>

          {adminMain ? (
            <AdminMain
              getClickTask={getClickTask}
              getVisibleModal={getVisibleModal}
              visibleModal={visibleModal}
              dataTasks={dataTasks}
              dataUsers={dataUsers}
              dataSession={dataSession}
              dataCompletedTask={dataCompletedTask}
            />
          ) : (
            <Row style={{ width: 1000, display: 'flex', flexDirection: 'column' }}>
              <Button style={{ width: 100 }} onClick={returnAdminMain}>
                Return
              </Button>
              <Form task={task} />
            </Row>
          )}
          <Modal
            title="Task review"
            width={'auto'}
            onCancel={() => setVisitableTable(false)}
            visible={visitableTable}
            onOk={handleOkTable}
          >
            <TableData dataRow={dataReviews} taskReview={visitableTable} />
          </Modal>
          <Modal
            title="Review requests"
            width={'auto'}
            onCancel={() => setVisitableReviewTable(false)}
            visible={visitableReviewTable}
            onOk={handleOkTable}
          >
            <TableData dataRow={dataReviewRequest} taskReview={visitableTable} />
          </Modal>
        </div>
      </main>
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  let dataUsers: any | undefined = [];
  let dataTasks: any | undefined = [];
  const crossCheckSession: any | undefined = [];
  // let courseUser: any | undefined = [];
  // let courseCrossCheckTasks: any | undefined = [];
  let dataSession: any | undefined = [];
  let dataCompletedTask: any | undefined = [];
  await db
    .collection('sessions')
    .get()
    .then((snap) => {
      dataSession = snap.docs.map((doc) => doc.data());
    });

  await db
    .collection('users')
    .get()
    .then((snap) => {
      dataUsers = snap.docs.map((doc) => doc.data());
    });
  await db
    .collection('TasksArray')
    .get()
    .then((snap) => {
      dataTasks = snap.docs.map((doc) => doc.data());
    });
  await db
    .collection('completed_tasks')
    .get()
    .then((snap) => {
      dataCompletedTask = snap.docs.map((doc) => doc.data());
    });

  const dataReviews = dataCompletedTask
    .map((task) => {
      if (task.cheсks.length > 0) {
        return task.cheсks.map((el) => {
          const reviewerName = task.reviewers.filter((reviewer) => reviewer.id === el.checkerID)[0];

          return {
            key: task.student.name + reviewerName.name,
            user: task.student.name,
            task: task.taskID,
            reviewer: reviewerName.name,
            score: el.score,
          };
        });
      }
    })
    .filter((el) => el)
    .flat(Infinity);

  const requestTasksID = dataSession[0].tasks
    .filter((el) => el.taskStage === 'REQUESTS_GATHERING')
    .map((el) => el.taskID);
  const filterTasks = requestTasksID
    .map((taskId) => dataCompletedTask.filter((el) => el.taskID === taskId))
    .flat(Infinity);

  const filterTaskState = filterTasks.filter((el) => el.state === TaskState.isSelfTest);

  const dataReviewRequest = filterTaskState.map((task) => ({
    key: task.student.name,
    user: task.student.name,
    task: task.taskID,
  }));

  return {
    props: {
      dataUsers,
      dataTasks,
      dataSession,
      dataCompletedTask,
      dataReviewRequest,
      dataReviews,
    },
  };
};
export default AdminPage;
