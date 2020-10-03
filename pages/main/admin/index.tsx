import React, { useState } from 'react';
import { Modal, Row } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { db } from '../../../firebase';
import AdminMain from '../../../components/Admin/index';
import Form from '../../../components/Form';
import TableData from '../../../components/TableData';
import Import from '../../../components/Import';
import { ITask } from '../../../interfaces/ITask';
import { UserBasic } from '../../../interfaces/IUser';
import { ICourse } from '../../../interfaces/ICourse';
import { IWorkDone, TaskState } from '../../../interfaces/IWorkDone';
import {
  CheckCircleTwoTone,
  CodeTwoTone,
  HomeTwoTone,
  DatabaseTwoTone,
  PlusCircleTwoTone,
  RightSquareTwoTone,
} from '@ant-design/icons';
import { List } from 'antd';

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
  const getClickDraft = (value: any) => {
    setAdminMain(false);
    setVisibleImport(false);
    // const task = JSON.parse(value);
    setTransferTaskForm(value);
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
  const handleOkImport = () => {
    setVisibleImport(false);
  };
  const handleOkTable = () => {
    setVisitableTable(false);
    setVisitableReviewTable(false);
  };

  return (
    <MainLayout title={'Admin'}>
      {/* <Title level={1}>Admin Page</Title> */}
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
            <List size="small" bordered style={{ marginRight: '20px', width: '220px' }}>
              <List.Item key={'Home'} onClick={returnAdminMain}>
                <div>
                  <HomeTwoTone twoToneColor="#40E127" style={{ marginRight: '4px' }} />
                  <span style={{ color: '#1890FF' }}>Home</span>
                </div>
              </List.Item>
              <List.Item key={'Create task'} onClick={showModalCreateTask}>
                <div>
                  <PlusCircleTwoTone twoToneColor="#FFDB00" style={{ marginRight: '4px' }} />
                  <span style={{ color: '#1890FF' }}>Create task</span>
                </div>
              </List.Item>
              <List.Item key={'Import/Export'} onClick={showImport}>
                <div>
                  <CodeTwoTone style={{ marginRight: '4px' }} />
                  <span style={{ color: '#1890FF' }}>Import/Export</span>
                </div>
              </List.Item>
              <List.Item key={'task management'} onClick={showModal}>
                <div>
                  <RightSquareTwoTone twoToneColor="#eb2f96" style={{ marginRight: '4px' }} />
                  <span style={{ color: '#1890FF' }}>task management</span>
                </div>
              </List.Item>
              <List.Item key={'Table results'} onClick={showTable}>
                <div>
                  <DatabaseTwoTone twoToneColor="#40E0D0" style={{ marginRight: '4px' }} />
                  <span style={{ color: '#1890FF' }}>Table results</span>
                </div>
              </List.Item>
              <List.Item key={'Review requests'} onClick={showReviewTable}>
                <div>
                  <CheckCircleTwoTone twoToneColor="#BA55D3" style={{ marginRight: '4px' }} />
                  <span style={{ color: '#1890FF' }}>Review requests</span>
                </div>
              </List.Item>
            </List>
          </div>
        </div>
        <div className="workspace">
          <Modal
            width={'1200px'}
            onCancel={handleOkImport}
            visible={visibleImport}
            onOk={handleOkImport}
          >
            <Import dataTasks={dataTasks} getClickDraft={getClickDraft} />
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
            <Row style={{ maxWidth: 1000, display: 'flex', flexDirection: 'column' }}>
              <Form task={transferTaskForm} />
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
    .map((task: any) => {
      if (task.cheсks.length > 0) {
        return task.cheсks.map((el: any) => {
          const reviewerName = task.reviewers.filter(
            (reviewer: any) => reviewer.id === el.checkerID
          )[0];

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
    .filter((el: any) => el)
    .flat(Infinity);

  const requestTasksID = dataSession[0].tasks
    .filter((el: any) => el.taskStage === 'REQUESTS_GATHERING')
    .map((el: any) => el.taskID);
  const filterTasks = requestTasksID
    .map((taskId: any) => dataCompletedTask.filter((el: any) => el.taskID === taskId))
    .flat(Infinity);

  const filterTaskState = filterTasks.filter((el: any) => el.state === TaskState.isSelfTest);

  const dataReviewRequest = filterTaskState.map((task: any) => ({
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
