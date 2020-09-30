import React, { useState } from 'react';
import { Button, Modal, Row, Typography } from 'antd';
import MainLayout from '../../../components/MainLayout';
import SubmitRandom from './submit-random';
import { db } from '../../../firebase';
import AdminMain from '../../../components/Admin/index';
import Form from '../../../components/Form';
import TableData from '../../../components/TableData';

interface PropsAdmin {
  dataUsers: [];
  dataTasks: [];
  crossCheckSession: [];
  dataReviews: [];
  dataSession: [];
}

const AdminPage: React.FC<PropsAdmin> = ({
  dataUsers,
  dataTasks,
  crossCheckSession,
  dataReviews,
  dataSession,
}) => {
  const { Title } = Typography;
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [visitableCreateTask, setVisitableCreateTask] = useState(false);
  const [visitableTable, setVisitableTable] = useState(false);

  const showModalCreateTask = () => {
    setVisitableCreateTask(true);
  };

  const showTable = () => {
    setVisitableTable(true);
  };
  const showModal = () => {
    setVisibleModal(true);
  };
  const getVisibleModal = (value: boolean) => {
    setVisibleModal(value);
  };
  const handleOk = (e: any) => {
    setVisitableCreateTask(false);
  };
  const handleOkTable = (e: any) => {
    setVisitableTable(false);
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
                Creat task
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
          </div>
        </div>
        <div className="workspace">
          <AdminMain
            getVisibleModal={getVisibleModal}
            visibleModal={visibleModal}
            dataTasks={dataTasks}
            dataUsers={dataUsers}
            crossCheckSession={crossCheckSession}
            dataSession={dataSession}
          />
          <Modal
            title="Create tasks"
            width={'auto'}
            onCancel={() => setVisitableCreateTask(false)}
            visible={visitableCreateTask}
            onOk={handleOk}
          >
            <Form task={task} />
          </Modal>
          <Modal
            title="Task review"
            width={'auto'}
            onCancel={() => setVisitableTable(false)}
            visible={visitableTable}
            onOk={handleOkTable}
          >
            <TableData dataRow={dataReviews} />
          </Modal>
        </div>
      </main>
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  let dataUsers: any | undefined = [];
  let dataTasks: any | undefined = [];
  let crossCheckSession: any | undefined = [];
  let dataSession: any | undefined = [];
  let completedTask: any | undefined = [];
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
    .collection('crossCheckSession')
    .get()
    .then((snap) => {
      crossCheckSession = snap.docs.map((doc) => doc.data());
    });
  await db
    .collection('completed_tasks')
    .get()
    .then((snap) => {
      completedTask = snap.docs.map((doc) => doc.data());
    });

  const dataReviews = completedTask
    .map((task) => {
      if (task.cheсks.length > 0) {
        return task.cheсks.map((el) => {
          const reviewerName = task.reviewers.filter((reviewer) => reviewer.id === el.checkerID)[0];

          return {
            key: task.student.name,
            user: task.student.name,
            task: task.taskID,
            reviewer: reviewerName,
            score: el.score,
          };
        });
      }
    })
    .filter((el) => el)
    .flat(Infinity);

  return {
    props: { dataUsers, dataTasks, crossCheckSession, dataReviews, dataSession },
  };
};
export default AdminPage;
